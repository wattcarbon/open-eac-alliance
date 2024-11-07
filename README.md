# Welcome to the OpenEAC Alliance Methodology Repository

This is the homepage for the current versions of the methodologies that allow WattCarbon to create EACs for clean energy resources. Each methodology category is contained in a separate folder.

The [OpenEAC Alliance](https://www.openeac.org/) is a volunteer organization comprised of individuals and organizations with experience developing measurement and verification techniques. Each methodology is reviewed by members of the OpenEAC Alliance and each change to an approved methodology will require notification of all reviewers.

For meeting updates and up-to-date communication, see our [substack](https://www.openeac.org/).

## Definitions

TODO: This section will be updated with agreed upon terms and definitions that can be used across different methodologies.

## Development Roadmap

The development of methodologies will happen in several phases, to enable both fast initial progress and capitalisation on the learnings in a consolidation phase. 

- Phase 1 (Self-contained methodologies): Each methodology contains all of the components that are needed to define its use. Approvals are made on self-contained documents which then become immutable after signature.

- Phase 2 (Modularized methodologies): Common components (such as valid carbon sources, resampling techniques, etc) are extracted and approved of separately and then referenced by individual methodologies.

## Methodologies

### Published Methodologies

| Category           | Methodology                                      | Author      | Approval Date | URL |
| ------------------ | ------------------------------------------------ | -------------- | ------------  | ------------  |
| (Pending)  |  |  |  |  |

### Submission
Individual methodologies are added by Pull Request ([step-by-step guide](https://github.com/wattcarbon/open-eac-alliance/blob/main/how-to-submit.md)). The methodology file should be added to the repo under the following naming structure: `methodologies/{category}/{methodology_title_snake_case}.md`.

### Approval Process

The approval process proceeds in several steps:

1. A Pull Request is submitted to the WEATS repository with a new methodology. The methodology MUST contain at least 2 authors.
2. The Pull Request is reviewed by the maintainers and added to the queue for presentation at an OpenEAC Alliance meeting.
3. The authors present the methodology to the OpenEAC Alliance.
4. The authors update the methodology based on feedback.
5. At least 3 reviewers must approve the methodology Pull Request.
6. A static PDF copy of the methodology is created and sent to the reviewers for official electronic signature.
7. This signed PDF is uploaded to the repository (under [approved_documents/methodologies](https://github.com/wattcarbon/open-eac-alliance/blob/main/approved_documents/methodologies) ) and the Pull Request is merged.

### Methodology Queue

> [!NOTE]
> See the current [Pull Requests](https://github.com/wattcarbon/open-eac-alliance/pulls) for the latest list of proposed methodologies.

The following methodologies are currently in the queue and will be incorporated into an upcoming OpenEAC Alliance meeting agenda.

| Category           | Methodology                                      | Developer      | Pull Request       |
| ------------------ | ------------------------------------------------ | -------------- | ------------------ |
| Solar              | Self-Consumed solar PV generation                | PeerCo         | wattcarbon/open-eac-alliance#2 |
| Energy Efficiency  | Whole-building Metered Lighting                  | C3             | wattcarbon/open-eac-alliance#3 |
| Electrification    | NREL ResStock Deemed Loadshapes                  | WattCarbon     | wattcarbon/open-eac-alliance#6 |

## Participating Registries

| Name                                     | Company            | Description                                |
| ---------------------------------------- | -------------------| ------------------------------------------ |
|[WEATS](https://www.wattcarbon.com/weats) | WattCarbon         | WattCarbon Energy Attribute Tracking System |
