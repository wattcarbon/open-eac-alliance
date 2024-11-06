# Welcome to the OpenEAC Alliance Methodology Repository

This is the homepage for the current versions of the methodologies that allow WattCarbon to create EACs for clean energy resources. Each methodology category is contained in a separate folder.

The OpenEAC Alliance is a volunteer organization comprised of individuals and organizations with experience developing measurement and verification techniques. Each methodology may be reviewed by one or more members of the OpenEAC Alliance and each change to a methodology will require notification of all reviewers.

For meeting updates and up-to-date communication, see our [substack](https://www.openeac.org/).

## Definitions

TODO: This section will be updated with agreed upon terms and definitions that can be used across different methodologies.

## Repository Layout Roadmap

- Phase 1 (Self-contained methodologies): Each methodology contains all of the components that are needed to define its use.
- Phase 2 (Modularized methodologies): Common components (such as valid carbon sources, resampling techniques, etc) are extracted and approved of separately and then referenced by individual methodologies.

## Methodologies

### Published Methodologies

| Category           | Methodology                                      | Developer      | Approval Date |
| ------------------ | ------------------------------------------------ | -------------- | ------------  |
| (Pending)  |  |  |  |

### Submission
Individual methodologies are added by Pull Request ([step-by-step guide](https://github.com/wattcarbon/WEATS/blob/main/how-to-submit.md)). The methodology file should be added to the repo under the following naming structure: `repo://methodologies/{category}/{methodology_title_snake_case}.md`.

### Approval Process

1. A Pull Request is submitted to the WEATS repository with a new methodology. The methodology MUST contain at least 2 authors.
2. The Pull Request is reviewed by the maintainers and added to the queue for presentation at an OpenEAC Alliance meeting.
3. The authors present the methodology to the OpenEAC Alliance.
4. The maintainers update the methodology based on feedback.
5. At least 3 reviewers must approve the methodology PR.
6. A static PDF copy of the methodology is created and sent to the reviewers for official electronic signature.
7. This signed PDF is uploaded to the repository and the Pull Request is merged.

### Methodology Queue

> [!NOTE]
> See the current [Pull Requests](https://github.com/wattcarbon/WEATS/pulls) for the latest list of proposed methodologies.

The following methodologies are currently in the queue and will be incorporated into an upcoming OpenEAC Alliance meeting agenda.

| Category           | Methodology                                      | Developer      | Pull Request       |
| ------------------ | ------------------------------------------------ | -------------- | ------------------ |
| Solar              | Self-Consumed                                    | PeerCo         | wattcarbon/WEATS#2 |
| Energy Efficiency  | Whole-building Metered Lighting                  | C3             | wattcarbon/WEATS#3 |
| Energy Efficiency  | Existing Construction Whole-building Simulation  | Auros Group    | wattcarbon/WEATS#5 |
| Energy Efficiency  | New Construction Whole-building Simulation       | Auros Group    | wattcarbon/WEATS#4 |
| Electrification    | NREL ResStock Deemed Loadshapes                  | WattCarbon     | wattcarbon/WEATS#6 |

## Participating Registries

| Name                                     | Company            | Description                                |
| ---------------------------------------- | -------------------| ------------------------------------------ |
|[WEATS](https://www.wattcarbon.com/weats) | WattCarbon         |WattCarbon Energy Attribute Tracking System |
