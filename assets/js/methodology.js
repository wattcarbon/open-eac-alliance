// Render a methodology, and keep it current.
//
// The page ships the text of its Google Doc as it stood when a maintainer last
// ran scripts/sync_google_docs.py. That copy is what a crawler reads, what a
// reader with no JavaScript reads, and what stays on the page when Google
// cannot be reached. Then this reads the document itself and, when the document
// has moved on, replaces the text in place.
//
// So the page is never stale to a reader and never empty to a crawler, and the
// sync is a convenience rather than a requirement.
//
// The work below is the same work scripts/sync_google_docs.py does, because a
// Google Docs export is not a document: the outline numbering that a clause is
// cited by exists in neither export, and the anchors that link a section to the
// document exist only in the HTML one.
(function () {
  "use strict";

  var EXPORT = "https://docs.google.com/document/d/{id}/export?format={format}";
  // A numbered outline exports as nested ordered lists that each restart at 1,
  // so a heading arrives as "1. ## Overview" and a clause under it as
  // "      1. The methodology shall".
  var OUTLINE_ITEM = /^( *)(\d+)\.\s+(.*)$/;
  var OUTLINE_STEP = 3;
  var MD_HEADING = /^(#{1,6})\s+(.+?)\s*$/;
  var MD_EMPHASIS = /\*\*|__|(?<![A-Za-z0-9])[*_](?![*_])/g;
  var TABLE_ROW = /^\s*\|/;
  var TABLE_DELIMITER = /^\s*\|[\s|:\\-]*$/;
  var HTML_HEADING = /<h([1-6])[^>]*\bid="(h\.[0-9a-z]+)"[^>]*>([\s\S]*?)<\/h\1>/g;

  function text(element) {
    return element.textContent.replace(/^¶\s*/, "");
  }

  // ---------------------------------------------------------------- the page

  // Compare heading text across two exports that write it differently: the HTML
  // export writes a non-breaking space where the Markdown export writes an
  // ordinary one, and the Markdown export escapes punctuation the HTML export
  // leaves alone, so "M\&V Plan" has to match "M&V Plan".
  function normalize(value) {
    return value
      .replace(/ /g, " ")
      .replace(/\\(?=[^A-Za-z0-9\s])/g, "")
      .replace(MD_EMPHASIS, "")
      .split(/\s+/)
      .join(" ")
      .trim()
      .toLowerCase();
  }

  function headings(root) {
    return Array.prototype.slice.call(root.querySelectorAll("h1,h2,h3,h4,h5,h6"));
  }

  // A clause is indented by the depth it was written at, which its number
  // states: 1.2.1.1 sits four deep.
  function markClauses(root) {
    Array.prototype.forEach.call(root.querySelectorAll("p"), function (paragraph) {
      var number = /^(\d+(?:\.\d+)*)[\s ]/.exec(text(paragraph));
      if (!number) return;
      paragraph.classList.add("clause");
      paragraph.classList.add("clause-" + Math.min(number[1].split(".").length, 6));
    });
  }

  // Each heading takes the next anchor whose level and text are its own. A
  // heading that finds none is published without one: a section link onto the
  // wrong section would be worse than no section link.
  function anchorHeadings(root, anchors) {
    var position = 0;
    headings(root).forEach(function (heading) {
      var level = Number(heading.tagName.slice(1));
      for (var candidate = position; candidate < anchors.length; candidate++) {
        if (
          anchors[candidate].level === level &&
          normalize(anchors[candidate].text) === normalize(text(heading))
        ) {
          heading.id = anchors[candidate].anchor;
          position = candidate + 1;
          return;
        }
      }
    });
  }

  function htmlAnchors(source) {
    var found = [];
    var match;
    HTML_HEADING.lastIndex = 0;
    while ((match = HTML_HEADING.exec(source)) !== null) {
      var inner = match[3].replace(/<[^>]+>/g, "");
      var decoded = document.createElement("textarea");
      decoded.innerHTML = inner;
      if (decoded.value.trim()) {
        found.push({ level: Number(match[1]), text: decoded.value, anchor: match[2] });
      }
    }
    return found;
  }

  // The document opens with a run of first-level headings that pair with no
  // anchor: the name of the tab it is written in, then its own title. The
  // lowest of them is the title, and the page states the title already.
  function liftTitle(root) {
    var run = [];
    for (var node = root.firstElementChild; node; node = node.nextElementSibling) {
      if (node.tagName === "H1" && !node.id) {
        run.push(node);
        continue;
      }
      break;
    }
    // A document that titles itself with a heading style pairs that heading
    // with an anchor like any other, so there is no unpaired run to find. It is
    // still the title, because it is what the document opens with.
    if (!run.length) {
      var first = root.firstElementChild;
      if (!first || first.tagName !== "H1") return "";
      run = [first];
    }
    var title = text(run[run.length - 1]).trim();
    run.forEach(function (node) {
      node.remove();
    });
    return title;
  }

  // ------------------------------------------------------------- the exports

  // Google Docs ends a paragraph in the two spaces that mean a line break in
  // Markdown, and starts the next on the following line. Consecutive lines are
  // one paragraph to a Markdown reader, so a line break between two paragraphs
  // becomes the blank line that separates them. A table is the exception: a
  // blank line between two of its rows ends the table.
  function clean(markdown) {
    var lines = markdown.replace(/\r\n/g, "\n").split("\n");
    var body = [];
    lines.forEach(function (line, position) {
      var paragraphBreak = /\s\s$/.test(line) && line.trim();
      line = line.replace(/\s+$/, "");
      // A document that writes a table's row of dashes without alignment colons
      // exports it escaped, and an escaped dash is a literal one.
      if (TABLE_DELIMITER.test(line)) line = line.replace(/\\/g, "");
      body.push(line);
      var following = position + 1 < lines.length ? lines[position + 1].trim() : "";
      if (
        paragraphBreak &&
        following &&
        !(TABLE_ROW.test(line) && TABLE_ROW.test(following))
      ) {
        body.push("");
      }
    });
    return body.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  // Put the outline numbering back. Every level exports as a list that restarts
  // at 1, so clause 1.1.4 arrives as a "4." nested three deep. A heading becomes
  // a heading reading "1.1 Introduction", and a clause becomes a paragraph
  // opening with its own number.
  function numberOutline(markdown) {
    var lines = [];
    var counters = [];

    function startBlock(line) {
      if (lines.length && lines[lines.length - 1].trim()) lines.push("");
      lines.push(line);
    }

    markdown.split("\n").forEach(function (line) {
      var item = OUTLINE_ITEM.exec(line);
      if (!item) {
        var plain = MD_HEADING.exec(line);
        if (plain) {
          counters = [];
          startBlock(plain[1] + " " + plain[2].replace(MD_EMPHASIS, "").trim());
          return;
        }
        lines.push(line);
        return;
      }

      var depth = Math.floor(item[1].length / OUTLINE_STEP);
      counters = counters.slice(0, depth);
      while (counters.length < depth) counters.push(1);
      counters.push(Number(item[2]));
      var number = counters.join(".");

      var heading = MD_HEADING.exec(item[3]);
      if (heading) {
        startBlock(heading[1] + " " + number + " " + heading[2].replace(MD_EMPHASIS, "").trim());
      } else {
        // An em space after the number, so a clause reads as a numbered
        // paragraph rather than as a sentence that opens with a figure.
        startBlock(number + " " + item[3]);
      }
    });
    return lines.join("\n") + "\n";
  }

  // ----------------------------------------------------------- the decoration

  function sectionMarks(root, docUrl) {
    headings(root).forEach(function (heading) {
      if (heading.id.indexOf("h.") !== 0) return;
      if (heading.querySelector(".methodology-comment")) return;
      var link = document.createElement("a");
      link.className = "methodology-comment";
      link.href = docUrl + "#heading=" + heading.id;
      link.textContent = "¶";
      link.title = "Read and comment on this section in Google Docs";
      link.setAttribute("aria-label", "Comment on " + text(heading).trim() + " in Google Docs");
      heading.insertBefore(link, heading.firstChild);
    });
  }

  var REFERENCE = /\b(Methodolog(?:y|ies)|Clauses?|Sections?|Appendix|Appendices|Assumptions?|under|in|from|per)(\s+)(\d+(?:\.\d+)*)/g;

  // A document holds several numbered sequences that each restart at 1: its
  // data requirements, its clauses, its assumptions, the items of an appendix.
  // A number alone therefore does not name a clause, and a reference resolves
  // against the sequence that its citing word names.
  function crossReferences(root) {
    var sections = {};
    var appendices = {};
    var current = null;

    function slug(value) {
      return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    }

    function anchor(element, id) {
      if (!id || document.getElementById(id)) return id;
      var mark = document.createElement("span");
      mark.className = "methodology-anchor";
      mark.id = id;
      element.insertBefore(mark, element.firstChild);
      return id;
    }

    Array.prototype.forEach.call(
      root.querySelectorAll("p.clause, h1, h2, h3, h4, h5, h6, li"),
      function (element) {
        if (/^H[1-6]$/.test(element.tagName)) {
          var heading = text(element);
          var appendix = /^Appendix\s+(\d+(?:\.\d+)*)/.exec(heading);
          if (appendix && !appendices[appendix[1]]) {
            appendices[appendix[1]] = anchor(
              element,
              "appendix-" + appendix[1].replace(/\./g, "-")
            );
          }
          if (!/^\d/.test(heading)) {
            current = slug(heading) || null;
            if (current && !sections[current]) sections[current] = {};
          }
        }
        var number = /^(\d+(?:\.\d+)*)[\s ]/.exec(text(element));
        if (!number || !current) return;
        if (sections[current][number[1]]) return;
        sections[current][number[1]] = anchor(
          element,
          current + "-" + number[1].replace(/\./g, "-")
        );
      }
    );

    // The clause tree is the sequence a bare reference means. It is the one
    // that nests, so it is the one holding numbers with a dot in them.
    var main = null;
    var deepest = 0;
    Object.keys(sections).forEach(function (name) {
      var nested = Object.keys(sections[name]).filter(function (number) {
        return number.indexOf(".") >= 0;
      }).length;
      if (nested > deepest) {
        deepest = nested;
        main = name;
      }
    });
    var clauses = main ? sections[main] : {};
    var assumptions = sections.assumptions || {};

    function target(word, number) {
      if (/^Appendi/.test(word)) return appendices[number];
      if (/^Assumption/.test(word)) return assumptions[number];
      return clauses[number];
    }

    // A number is linked only after a word that announces a reference, and only
    // when what it names exists on this page. Both tests are needed: without the
    // first, "13,244 kWh" becomes a link; without the second, "in 2025" points
    // at a clause 2025 that no document has.
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        for (var parent = node.parentNode; parent && parent !== root; parent = parent.parentNode) {
          if (/^(A|CODE|PRE)$/.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        }
        REFERENCE.lastIndex = 0;
        return REFERENCE.test(node.nodeValue)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });
    var found = [];
    var node;
    while ((node = walker.nextNode())) found.push(node);

    found.forEach(function (candidate) {
      var value = candidate.nodeValue;
      REFERENCE.lastIndex = 0;
      var fragment = null;
      var position = 0;
      var match;
      while ((match = REFERENCE.exec(value)) !== null) {
        var id = target(match[1], match[3]);
        if (!id) continue;
        fragment = fragment || document.createDocumentFragment();
        var start = match.index + match[1].length + match[2].length;
        fragment.appendChild(document.createTextNode(value.slice(position, start)));
        var link = document.createElement("a");
        link.className = "methodology-xref";
        link.href = "#" + id;
        link.textContent = match[3];
        fragment.appendChild(link);
        position = start + match[3].length;
      }
      if (!fragment) return;
      fragment.appendChild(document.createTextNode(value.slice(position)));
      candidate.parentNode.replaceChild(fragment, candidate);
    });
  }

  function decorate(root, docUrl) {
    markClauses(root);
    sectionMarks(root, docUrl);
    crossReferences(root);
  }

  // ------------------------------------------------------------------- start

  function start() {
    var body = document.querySelector(".methodology-body");
    if (!body) return;
    var settings = document.getElementById("methodology-settings");
    var docId = settings && settings.getAttribute("data-document");
    var docUrl = "https://docs.google.com/document/d/" + docId + "/view";

    decorate(body, docUrl);

    // Everything below replaces that text with the document as it stands. Each
    // failure is silent and leaves the published text in place: an unreachable
    // document, an export that changed shape, a reader offline. None of those
    // are facts about the methodology.
    if (!docId || !window.fetch || !window.marked) return unread();
    Promise.all([
      fetch(EXPORT.replace("{id}", docId).replace("{format}", "md")).then(read),
      fetch(EXPORT.replace("{id}", docId).replace("{format}", "html")).then(read),
    ])
      .then(function (exports) {
        var markdown = numberOutline(clean(exports[0]));
        var rendered = document.createElement("div");
        rendered.innerHTML = window.marked.parse(markdown, { gfm: true, breaks: false });
        anchorHeadings(rendered, htmlAnchors(exports[1]));
        var title = liftTitle(rendered);
        if (!rendered.textContent.trim()) return;
        body.innerHTML = rendered.innerHTML;
        decorate(body, docUrl);
        var subtitle = document.querySelector(".methodology-doc-title");
        var pageTitle = document.querySelector(".methodology-title");
        if (subtitle && title && pageTitle && title !== pageTitle.textContent.trim()) {
          subtitle.textContent = title;
          subtitle.hidden = false;
        }
      })
      .catch(unread);
  }

  // The waiting message is what a reader sees until the document arrives, and
  // it says the page is reading. A read that fails leaves it saying so for
  // ever, which reads as a page still working rather than as one that cannot.
  function unread() {
    var waiting = document.getElementById("methodology-waiting");
    var failed = document.getElementById("methodology-unread");
    if (!waiting || !failed || !waiting.parentNode) return;
    waiting.hidden = true;
    failed.hidden = false;
  }

  function read(response) {
    if (!response.ok) throw new Error(response.status);
    return response.text();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
