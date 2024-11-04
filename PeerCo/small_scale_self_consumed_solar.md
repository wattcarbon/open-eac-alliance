<!--

This is a template to be used for methodology development. The content of this file shall follow the Markdown conventions with Github flavour.


If you need help on the Markdown syntax for Github, here is a good link:
https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

And if you need a tool to make the rendering work in VSCode, here is a good plugin:
https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles 

--> 
# Small scale solar self-consumption methodology

**Name**: *Small scale solar self-consumption*

**Developed by**: *[PeerCo](www.peerco.earth)*

**Revision date**: *November 4th 2024*

**Sectoral scope**:  *Energy / Energy Distribution / Energy Demand*


## Summary description

This methodology is for measurements and verification of self-consumed small-scale on-site solar generation on a given site. The purpose of this methodology is to generate *Environmental Attribute Certificates* representing the self-consumed solar energy (at a specific time and geographical location), which can then be used in reporting or traded.

## Definitions

This section provides definitions of the key aspects of this methodology.

### Normative language

The following terminology is used throughout this document to outline requirements and guidelines (accordingly with common standardisation practices):
- **shall** indicates a *requirement*,
- **should** indicates a *recommendation*,
- **may** indicates an *option* that is permitted.

### Acronyms

*(this section shall contains the list of acronyms in alphabetical order)*

| Acronym | Full text           |
|---------|---------------------|
| CDM     | Clean development mechanism |
| EAC     | Energy Attribute Certificate |
| GHG     | Greenhouse gas(es)  |
| kWh     | Kilowatt-hour (energy unit) |
| kWp     | Kilowatt peak (installed capacity power unit for PV) |
| M&V     | Measurement and Verification |
| MWp     | Megawatt peak (installed capacity power unit for PV) |
| PV      | Photovoltaic        |
| UN      | United Nations      |

### Glossary

- **Digital certificate** is a generic term designating environmental attributes in digital form generated using this methodology, which will correspond to Energy Attribute Certificates (EACs).

- **Emission intensity** (or *carbon intensity*) is a measure of how clean grid electricity is. It refers to how many grams of carbon dioxide equivalent (gCO2e) are released to produce a kilowatt hour (kWh) of electricity. In this methodology, an *average* measure of this factor *on the demand side* is considered at every hour and for a given grid area, meaning that this number reflects the carbon intensity of the *average kilowatt-hour consumed* in this given hour and grid region.

- **High resolution data** is data whose time resolution is hourly or sub-hourly (e.g. every 15 or 30 minutes).

- **Grid region** is a generic term used here to refer to a specific sub-division of a large-scale power system. This may be a balancing region, a country-wide grid, a market-bidding region depending on the local context. The spatial resolution used for the grid region used in a given application should be as granular as allowed by the data available.

- **PV asset** is a set of photovoltaic arrays and associated inverter(s) converting solar irradiance to electrical power.   

## Applicability conditions

This section lays out the requirements on a given context for this methodology to be applicable.

### System eligibility requirements

The system to which the methodology is applied shall meet the following requirements to be eligible:

1. the rating of the PV is below 5 MWp

2. the system is a fixed installation, meaning that the PV system is mounted on a unique specific site where it will operate throughout the project

3. generation is measured by the inverter(s) or a digital meter with high resolution data, which can either be communicated automatically by digital means (e.g. Rest API) or retrieved manually

4. the asset owner documents the following:

    a. PV asset type and brand

    b. location of the installation (address, or GPS coordinates if an address is not available)

    c. date when the PV panel started generating power on this site

5. the power produced by the PV asset does not displace other on-site power generation (i.e. there is no on-site power generation whose output is affected by the generation of the PV asset)

6. the asset owner or operator is not already being rewarded for self-consumption by another entity (e.g. government subsidies, ...)

7. site demand (either as total demand or grid import) is measured by a digital meter with high resolution data, which can either be communicated automatically by digital means or retrieved manually

In cases where power is exported from the site (i.e. not all solar generation is self-consumed), the following requirements shall also be met:

8. the electricity export from the site is measured by a digital meter with high resolution data, which can either be communicated automatically by digital means or retrieved manually.

### Requirements on the system during the project lifetime

During the whole duration of the project, the PV asset owner shall demonstrate proof of ownership of the asset and continued operation of the self-consumption. This documentation shall be made via all of the following:

- sharing of consumption data throughout the period,

- in the case of usage of the environmental attribute in reporting:
    - contractual renunciation to the possibility of transfer of the environmental assets to a third party.

- in the case of sales of the environmental attribute to a third party:
    - contractual transfer of the environmental attribute ownership of the self-consumed generation,
    - carbon accounting for the site (location and market-based) should reflect the sale of the carbon reduction corresponding to the transfer of the certificate.


### Requirements on the operating context

The project country shall meet the following criteria:
1. delivery of micro-solar is not a requirement for building development or to meet an enforced carbon quota,
2. emission intensity data is available at the hourly (or sub-hourly) level for the national or local grid.


## Project boundary

GHG sources included or excluded from the project boundary.

| Source                     | Gas     | Included | Justification           |
| -------------------------- |---------|----------|------------------------ |
| Grid electricity displaced | $CO_2$  | Yes      | Main emission source    |
| Grid electricity displaced | $NO_x$, $SO_x$  | No       | Emissions data is not sufficiently granular and available the half hour or hour |


## Measurement

This section introduces the underlying data requirements.

### Asset data

PV production data shall be acquired via automatic digital communication once the project is established. However, in the initial phase of setting up a project (qualifying the site, its data and quantifying the benefits of the scheme), offline extractions of the data in an open format (which may be CSV, XLSX, etc.) may be accepted.

All self-consumption data (and related generation data) shall be quality controlled prior its usage to generate verified certificates. This verification shall include:
1. the maximum PV generation is in line with the PV asset's nominal rating,
2. self-consumption is always lower than the total consumption,
3. no significant PV generation is happening when there is no solar irradiance (e.g. at night).

Where data is missing, data filling (e.g. with interpolation) shall not be carried out. Digital certificates shall therefore be generated based upon measured data only.

When carrying out this asset data verification, a tolerance should be given for numerical purposes (e.g. to account for rounding of measurements by digital systems). This tolerance shall however not be of a magnitude that significantly impacts the volume of the certificates generated.

### Emission intensity data

The emission intensity data used in calculations shall meet the following requirements:

1. the time resolution of the data is hourly or higher,
2. the geographical resolution of the data is country-level or higher,
3. the signal corresponds to an average emission intensity of *consumed* electricity,
4. the source of the carbon intensity data shall be recorded as part of the digital asset generated.

Data may originate from one of the sources listed in *Appendix 2*.

## Verification and additionality

This section provides the key aspects of the verification methodology, based upon the data of the previous section.

### Baseline scenario

The baseline scenario considered is a scenario where the PV asset is not installed, therefore zero generation happens from this asset and electricity is imported from the grid instead.

### Quantification of GHG emission reduction and/or clean energy produced

This methodology supports the generation of EACs accounting for the energy consumed on site, which also account for the avoided carbon emissions (as an extra information embedded in the certificates).

The clean energy generation accounted in this methodology shall be limited to the self-consumed part of the PV asset (i.e. exports are thereby excluded, as they may already be accounted for in another certificate scheme).

Certificates shall be generated for specific time periods, where the length of these time periods shall not exceed one hour. In contexts where the electricity market's settlement period is less than an hour (e.g. 30 minutes for Great Britain), the certificates may be issued for durations matching this settlement period.

For each period *i*, the certificate's energy content shall be:
> EAC energy content[i] [kWh] = Self-consumed PV asset generation[i] [kWh]

and its carbon content shall be:
> EAC carbon content[i] [gCO2e] = (Self-consumed PV asset generation[i] [kWh]) x (Average grid emission intensity[i] [gCO2e/kWh])


### Information content of the digital certificate

The following conventions shall apply to the information provided:
- timestamps are given in UTC timezone
- dates are given in the local timezone where the asset is located
- "period" refers to the specific time range with explicit start (inclusive) and end (exclusive) where the corresponding amount of energy was generated
- energy amounts are expressed in Wh

The digital certificates resulting from this verification methodology shall contain the following information:

- PV asset informations:
    - Name of the production device
    - A unique identifier
    - Address of the site where it is installed (optional if GPS coordinates are provided)
    - GPS coordinates of the installation (optional if full address is provided, as it will be inferred from it)
    - Rated power (kWp)
    - Date when the PV panel started generating power on the site

- Grid connection information for the site:
    - Grid region type (e.g. "market-bidding zone")
    - Identifier of the grid region (e.g. "UK")
    - Identification of the grid connection (such as power meter number), where this identifier should correspond to the standard identification for the country/zone of application when such a standard exists (e.g. MPAN meter numbers in the United Kingdom).

- Time information about the period:
    - Start timestamp
    - End timestamp

- Energy content:
    - Amount of PV generation from the asset that was self-consumed over the period (in Wh)

- Emission intensity of the grid:
    - Average emission intensity of the grid over the period
    - Source of the average emission intensity data (e.g. "carbonintensity.org.uk")
    - Identifier of the grid region corresponding to the emission intensity data (e.g. "London")

- Details about certificate issuance:
    - Timestamp when the certificate was generated
    - Country for which the certificate is issued
    - A link to this methodology (where the URL points to the specific version used to generate the certificate)

- Legal information:
    - Reference to the contractual proof of ownership of the environmental attributes generated by the PV asset.


## References

*(None)*

---

# Appendix

Contextual information is provided in the appendices below. These only contain informational elements which do not hold normative value.

## Appendix 1 - Underlying motivation for the methodology

**Market failure**

Small-scale rooftop solar generation costs more to deliver per kWh of electricity produced than commercial solar arrays, and the economic case worsens for urban sites where installation is usually more costly. Electricity generated from a solar array can either be consumed immediately on-site, stored in a battery for later use, or exported to the grid. When renewable electricity is sold to the grid, it effectively creates an Energy Attribute Certificate (EAC), which can be resold, with or without a sale of electricity, to cover either a green power purchase agreement or an EAC sale.  In the case of the solar electricity, from the same array, which was self-consumed on-site or stored in a battery, it has the same attributes as the electricity sold to the grid and, likewise, has a linked EAC. Typically, because self-consumed electricity does not pass onto the grid there is no verification of its creation and therefore no revenue stream. PeerCo recognises that a carbon backed revenue stream either, in the form of an EAC or a carbon credit for self-consumed renewable electricity, has the potential to positively shift the business case for smaller sites including public buildings, schools, individual roof-tops within designated energy communities, commercial and industrial buildings, and a multitude of urban buildings were installation is expensive and roof-tops are small relative to overall building size. 

There is no specific market tool other than the retail price of electricity that encourages self-consumption, even though decentralised solar has huge potential to both provide renewable electricity with less burden on the grid, improve resiliency, and reduce the carbon footprint of the building user. Furthermore, urban solar generation is providing renewable electricity at the points of consumption.

The only real difference between self-consumed electricity and electricity exported to the grid is that the exported electricity flows through a payment meter and this provides verification. Self-consumed electricity also often flows through a sub-meter and can be captured through a range of smart meter and e-Car charging apps. The data is now there to fully account for this electricity. The UN Clean Development Mechanism does allow for generation of a carbon credit linked to grid connected, self-consumed electricity generation in Annex 1 Countries, and accounts for this value through its methodology. PeerCo is addressing this same carbon savings for small-scale arrays located in more countries provided that there is metered data and third-party verification.

**Tools and methods used as a reference**

This methodology used the latest version of the following tools:
- CDM methodological tool Demonstration of additionality of small-scale project activities
- CDM methodological Tool for the demonstration and assessment of additionality

This methodology is based upon approaches used in the following methodologies:

- CDM methodology for Grid Connected electricity generation from renewable sources 
- CDM Methodology for zero-emissions grid-connected electricity generation from renewable sources in Chile or in countries with merit order based dispatch
- CDM Small-scale Methodology for Renewable Electricity generation for captive use and mini-grid.
- [AMS-IA: Electricity generation by the user --- Version 19.0](https://cdm.unfccc.int/methodologies/DB/1TIFADHWTMIW25TAL778RLEFJ6AWBB)


All of the relevant existing methodologies are published by the UN Clean Development Mechanism, which focuses on larger scale projects in emerging economies. The small-scale methodology for renewable sources can include projects such as tidal and hydro and can be as large as 15MW. These are still large installations when compared to the small arrays that are being placed individually on roof-tops of homes, offices, warehouses and commercial and industrial buildings.

This methodology being presented by PeerCo is for even smaller-installations than outlined in the CDM methodology, between 30 kWp and up to 4.9 MWp. The micro-versus small-scale is a key distinction as the economics are quite different. In this way, the methodology is new, but fits within the same structure, aims and similar emissions calculations to the CDM methodologies. 

The other key difference is that this methodology is intended to be used in any country where the delivery of micro-solar is not a requirement for building development or to meet an enforced carbon quota.

**Additionality considerations**

The concept of additionality is that a project or investment would not have happened were it not for the additional carbon revenue stream. However, there is sufficient market evidence to prove that without subsidy, small-scale solar, particularly urban solar, has a long repayment period resulting in a marginal business case. Any user of this methodology should use direct carbon funding to those organisations that are making these marginal investments. In countries that are not Kyoto Protocol Annex 1 Countries, there is an even higher threshold for meeting additionality.

Small-scale, self-consumed solar electricity is additional because it has the potential to enable grid systems to decarbonise faster by generating electricity at the location of consumption, within the low voltage, electricity network (after the substation). Small-scale, intermittent, solar electricity that is exported to the grid can create capacity problems in local areas, requiring investment, but its delivery at scale can also reduce the need for larger investments in the transmission network. Incentivising self-consumption of solar is a win-win where the local burden on the network is reduced in tandem with overall demand. Furthermore, more local solar PV and on-site use, supports Sustainable Development Goal 7 - Affordable and Clean Energy, by capturing the carbon value and making it more affordable.

Additionally, there may be situations where solar was delivered as a requirement for development approval for a larger project. The methodology is valuing the carbon reduction that is delivered by choice, not as a requirement. In some countries and regions, there are financial incentives that may shift the financial case for a solar investment and self-consumption, and for these reasons, the applicability of this methodology needs assessment on a country by country basis. 

## Appendix 2 - potential sources of emission intensity data

The emission intensity data used in calculations shall originate from the source in the table below for the geography corresponding to the location of the assets.

| Geography     | Emission intensity source                              |
|---------------|--------------------------------------------------------|
| Great Britain | [National Grid ESO's *carbonintensity.org.uk* API](https://www.carbonintensity.org.uk/) |
| Global        | [ElectricityMaps API](https://www.electricitymaps.com/) |

The source of the carbon intensity data shall be recorded as part of the digital asset generated.

## Appendix 3 - M&V plan template

<!-- Inspiration available here: https://docs.google.com/document/d/1rxprZFyGdoC_9n102smCbcYcZ1gMGg4KpGkBZZQtPqo/edit?tab=t.0 -->

<!-- Notes:
We may need to add:
- Unique identifiers in the registries (need a discussion with WattCarbon on how we generate universally unique identifiers within OpenEAC - i.e. a data management protocol)
-->

The table below is a suggestion for the formalism to be used in filling in an M&V plan for a project.


| Parameter     | Value/Notes                                         |
|---------------|-----------------------------------------------|
| Creation date |               |
| Methodology   | Use "Small-scale solar self-consumption"            |
| M&V validity start date |     |
| M&V validity end date |       |
| Country       |  | <!-- Location details -->
| Site address  | (Optional if GPS coordinates are provided) |
| GPS coordinates of the site | (Optional if full address is provided - else must be provided with 6 decimals) | 
| Grid region | (indicate the name and type, e.g. "UK - market-bidding zone") |
| Identification of the grid connection | (use the local standard for the region, e.g. "MPAN number 123456" for the United Kingdom) |
| Installation rated power [kWp] |  | <!-- Asset details -->
| Generation start date |       |
| Asset identifier(s)   | (any information allowing to uniquely identify the asset - e.g. model(s) and serial number(s)) |
| Owner of the assets |     | <!-- M&V details -->
| Asset(s) owner contact | (full name and email) |
| Organisation carrying out the M&V | |
| M&V organisation contact | (full name and email) |
| Source of the carbon intensity data | (URL of the service) |
| Region of the carbon intensity data | (specify the region in the terminology used by the service) | 
| Confirmation that the assets have not received public subsidies | |
| Confirmation that the ownership of the environmental attributes may be transferred to a third party | |
| OpenEAC registry where the EACs will be registered |  |
| How will the site measurement data be collected? | (free text input providing the technical details of the data flows from the asset to the M&V organisation) |

In order to avoid ambiguities and improve interoperability, it is recommended that the following conventions are observed:
- Dates are given in ISO 8601 format (i.e. "yyyy-mm-dd" format),
- Country codes in ISO 3166 format is added to the country name,
- For online services, the URL of the service is added after the name,
- For confirmations, the reference to the contracts where this was declared is provided.
