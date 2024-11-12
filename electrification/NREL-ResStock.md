# Electrification - Modeled Methodology Document
 - Name: **NREL ResStock Scaled by Square Footage**
 - Developer: **WattCarbon**
 - Revision Date: **2024-03-15**

## Glossary
*Asset*: An energy device or energy system within a measurement boundary acted upon by an intervention that results in a change in energy consumption relative to a baseline. 

*Site*: A uniquely identifiable geographical location of an Asset

## Summary
The purpose of this methodology is to estimate the energy and related carbon impact of electrification Assets. Specifically, we look to measure the number of hourly useful heat EACs, the avoided emissions from fuel-switching, and the generated grid emissions from changing electricity consumption.

## NREL ResStock

This methodology relies on the [NREL ResStock](https://resstock.nrel.gov/), an extensive and detailed dataset that targets the residential sector's energy efficiency and electrification upgrades in the United States.
The building stock represents, as closely as possible, the U.S. building stock as it was in 2018.
It embodies a rich assembly of data on millions of individual homes, including their construction details, geographic locations, energy use characteristics, and potential for energy-saving improvements.
Learn more on [NREL's ResStock FAQ](https://resstock.nrel.gov/page/faq#what-buildings-are-represented-by-each-dataset).

The NREL ResStock data is periodically updated with new features.
This methodology is based on [resstock_amy2018_release_1.1](https://data.openei.org/s3_viewer?bucket=oedi-data-lake&prefix=nrel-pds-building-stock%2Fend-use-load-profiles-for-us-building-stock%2F2022%2Fresstock_amy2018_release_1.1%2F) which contains 548,916 unique building models meant to represent the continental US.
The "AMY2018" means it used the [Actual Meteorological Year 2018 weather data](https://data.openei.org/s3_viewer?bucket=oedi-data-lake&prefix=nrel-pds-building-stock%2Fend-use-load-profiles-for-us-building-stock%2F2022%2Fresstock_amy2018_release_1%2Fweather%2F) to construct disaggregated building sets of 8760 loadshapes. 

This [data dictionary](https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2022/resstock_amy2018_release_1.1/data_dictionary.tsv) explains the columns and this [enumeration dictionary](https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2022/resstock_amy2018_release_1.1/enumeration_dictionary.tsv) explains the allowable values for each column.          

### Measure Upgrades

In this version, NREL reran their models to generate similar loadshapes for all of the buildings for 10 "what-if we upgraded X" scenarios.
[The ResRound1 technical documentation](https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2022/EUSS_ResRound1_Technical_Documentation.pdf) goes into the details around the assumptions made for each of these measure upgrades, but they can be summarized as follows:

1. Basic enclosure
2. Enhanced enclosure
3. Heat pumps, min-efficiency, electric backup
4. Heat pumps, high-efficiency, electric backup
5. Heat pumps, min-efficiency, existing heating as backup
6. Heat pump water heaters
7. Whole-home electrification, min-efficiency
8. Whole-home electrification, high efficiency
9. Whole-home electrification, high efficiency + basic enclosure package
10. Whole-home electrification, high efficiency + enhanced enclosure package

## Inputs

### Asset Ownership
| **Field**                     | **Description**                 | **Default if not provided** | **Notes**  |
|-------------------------------|---------------------------------|-----------------------------|------------|
| Asset Owner Full Legal Name   |                                 |                             | `Required` |
| Asset Owner E-mail Address    |                                 |                             |            |
| Asset Owner Phone Number      |                                 |                             |            |
| Asset Owner Mailing Address   |                                 | Site's Address              | `Required` |
| Asset Owner Mailing Address 2 |                                 | Site's Address              | `Required` |
| Asset Owner City              |                                 | Site's Address              | `Required` |
| Asset Owner State             |                                 | Site's Address              | `Required` |
| Asset Owner Zip Code          |                                 | Site's Address              | `Required` |

### Asset Location
| **Field**       | **Description**                                                   | **Default if not provided**   | **Notes**  |
|-----------------|-------------------------------------------------------------------|-------------------------------|------------|
| Site Address    |                                                                   |                               | `Required` |
| Site Address 2  |                                                                   |                               | `Required` |
| Site City       |                                                                   |                               | `Required` |
| Site State      |                                                                   |                               | `Required` |
| Site Zip Code   |                                                                   |                               | `Required` |
| Latitude        |                                                                   | Geocoded from the address     | `Required` |
| Longitude       |                                                                   | Geocoded from the address     | `Required` |

### Grid
| **Field**            | **Description**                                                                                   | **Default if not provided**                 | **Notes**  |
|----------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------|------------|
| Balancing Authority  | The entity managing a specific section of the national grid                                       | Inferred from the site's latitude/longitude | `Required` |
| Load Zone            | A geographic area within a power grid defined for managing electricity demand and supply          |                                             | `Required` |
| Utility              | Entity that manages the specific distribution grid                                                |                                             | `Required` |

### Building
| **Field**                                | **Description**                                                                              | **Default if not provided** | **Notes**  |
|------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------|------------|
| Methodology Documentation Link/Reference | Information about how the savings was calculated. |  | `Required` |
| Alternative Fuel to Electrification      | What fuel would have been used if this Asset was not installed?                              | Natural Gas                | `Required` |
| Square Footage of Living Space           |                                                                                              |                             | `Required` |
| Existing Furnace AFUE                    | Annual Fuel Utilization Efficiency                                                           | 60-92%                     | `Required` |
| Existing Water Heater UEF                | Uniform Energy Factor                                                                        | 0.59 or 0.67               | `Required` |
| Likely Heating Thermostat Setpoint (°F)  |                                                                                              | 68F, 70F, 72F              | `Required` |
| Likely Heating Thermostat Setpoint Offset (°F) |                                                                                          | 0F, 2F, 

### Electrification
| **Field**                      | **Description**                                        | **Default if not provided**                  | **Notes**  |
|--------------------------------|--------------------------------------------------------|----------------------------------------------|------------|
| EUL                            | Expected Useful Life of the Asset                      | Assume 12 years                             | `Required` |
| Heating Backup System          | The backup system (if any) that was installed          |                                              | `Required` |
| Heat Pump HSPF                 | Heating Seasonal Performance Factor                    | 14                                           | `Required` |
| Water Heater UEF               | Uniform Energy Factor                                  | 3.4                                          | `Required` |
| Dryer CEF                      | Combined Energy Factor                                 | 5.2                                          | `Required` |
| Rated for cold climates?       | Whether the Asset is rated for cold climates           | No if a backup system is specified, otherwise Yes | `Required` |
| Furnace Replacement?           | Which appliances were electrified, at least one should be "yes"! | Assume No                  | `Required` |
| Water Heater Replacement?      |                                                        | Assume No                                    | `Required` |
| Oven Replacement?              |                                                        | Assume No                                    | `Required` |
| Dryer Replacement?             |                                                        | Assume No                                    | `Required` |
| Pool Heater Replacement?       |                                                        | Assume No                                    | `Required` |
| Additional EE Work Done During Install? | Associated energy efficiency improvements         | Assume None                                 | `Required` |

## Step-by-Step

The general approach is to:
1) Select a "measure upgrade" that most closely aligns with the *Asset*.
2) Select a subset of buildings in the NREL ResStock dataset that most closely match the building where the Asset took place. 
3) Select a subset of columns to use for building composite loadshapes that represent the impact of the *Asset* at the *Site*.
4) Calculate the average savings-per-sqft across the selected model buildings using the selected columns.
5) Multiply by the square footage at the Asset's Site to get an estimate for electricity and gas savings of each of these loads.
6) Use the load-specific timeseries to calculate useful heat EACs, avoided carbon emissions from fuel-switching, and generated carbon emissions from electricity.

### 1. Select an NREL "Measure Upgrade"

The purpose of this step is to match the *Asset* to one of the [10 measure upgrades](#measure-upgrades). 

> [!TIP]
> The important piece is that the type of upgrade matches the *Asset*. Aspects such as the energy factors of the *Asset* or existing appliance efficiencies can be adjusted in subsequent steps.

A noticeably absent upgrade in the listed measures is a heat pump with no backup system.
If the *Asset* does not have a backup system, select the measure upgrade with an electric backup system.
(This is because the ‘electric backup’ option puts all of the backup generation reliably in a single column that can be used, where the existing heating as backup varies between whether the existing heating was electric resistance or gas.)
An adjustment will be made to handle this case in a subsequent step.

### 2. Select a Subset of NREL Buildings

The purpose of this step is to find the set of building models whose characteristics best match those at the *Site*.
This filtering process includes both geographical, physical, and behavioral characteristics.
This filtering process can be done either through a tool like AWS Athena that directly accesses the S3 buckets, or by [downloading a metadata file](https://data.openei.org/s3_viewer?bucket=oedi-data-lake&prefix=nrel-pds-building-stock%2Fend-use-load-profiles-for-us-building-stock%2F2022%2Fresstock_amy2018_release_1.1%2Fmetadata%2F).
The metadata files contain building characteristics and estimates annual appliance-level consumption data after the upgrade took place for each building in the ResStock dataset.

#### Geographical
- `in.state`: The US state that the *Site* is in. This filter is ignored if it leads to too few models being selected.
- `in.census_division`: The census division that the *Site* is in.  This filter is ignored if it leads to too few models being selected.
- `in.ashrae_iecc_climate_zone_2004`: The older ASHRAE Climate Zone Designations (before the 2018 update).

#### Physical
- `in.geometry_building_type_recs`: One of: [  "Single-Family Detached", "Single-Family Attached", "Multi-Family 2-4", "Multi-Family 5+", "Mobile Home"]
- `in.insulation_wall`: Whether to include only homes that were previously insulated, previously Uninsulated, or to include both types of homes.
- If the *Asset* replaces the heating system)
  - `in.hvac_heating_type_and_fuel` : This should match the fuel that would most likely to be used if the *Site* had not been electrified. We are generally assuming this to be "Natural Gas" unless there are specific circumstances to indicate otherwise.
  - - If the *Asset* replaces the water heater)
  - `in.water_heater_fuel` : This should match the fuel that would most likely to be used if the *Site* had not been electrified. We are generally assuming this to be "Natural Gas" unless there are specific circumstances to indicate otherwise.

#### Behavioral
 - `in.vacancy_status = 'Occupied'` to only include occupied buildings
 - `in.heating_setpoint IN ('68F','70F','72F')` to limit to reasonable heating setpoints.
 - `in.heating_setpoint_offset_magnitude IN ('0F','2F','4F','6F')` to limit to reasonable heating offsets.
    
These filters will lead to a subset of building ids that will be used in both the metadata file and also can be subsequently used to generate composite 8760 loadshapes.

### 3. Select a Subset of Columns

The NREL loadshape files contains 147 output columns.
This model needs to select a subset of these columns from the baseline case in order to represent the avoided fuel site usage, and a subset of columns from the "measure upgrade" case in order to represent the consumed electricity site usage, which will be computed in a subsequent step.
For the sake of example (and in most cases), assume that the avoided fuel is Natural Gas.

Each disaggregated loadshape has 2 columns in the dataset, one for the estimated consumption of that home, and one of the consumption intensity. In the ResStock dataset, consumption intensity can be interpreted as consumption/sq-ft.

#### Baseline Columns
The following columns should be included in order to estimate the avoided fuel consumption of the *Asset*. 

If the furnace is being replaced:
-  `out.natural_gas.fireplace.energy_consumption_intensity`
- `out.natural_gas.heating_hp_bkup.energy_consumption_intensity`
- `out.natural_gas.heating.energy_consumption_intensity`
- `out.electricity.heating_fans_pumps.energy_consumption_intensity`

If the water heater is being replaced:
-  `out.natural_gas.hot_water.energy_consumption_intensity`

If the range oven is being replaced:
- `out.natural_gas.range_oven.energy_consumption_intensity`

If the dryer is being replaced:
- `out.natural_gas.clothes_dryer.energy_consumption_intensity`

#### Measure Upgrade Electricity Columns

The following columns should be included in order to estimate the electricity consumption of the *Asset*.
The columns need to be split out by their COP values so they can be used to calculate the estimated Useful Heat of the *Asset*.

If the furnace is being replaced:
- `out.electricity.heating_fans_pumps.energy_consumption_intensity`, COP=1
- `out.electricity.heating.energy_consumption_intensity`, COP/HSPF2 provided or use [default](#defaults)

If the furnace replacement includes either an electric backup system or has no backup system:
- `out.electricity.heating_hp_bkup.energy_consumption_intensity`, COP =1 if electric backup system...

If water heater is being replaced:
- `out.electricity.hot_water.energy_consumption_intensity`, COP/UEF provided or use [default](#defaults)

If the dryer is being replaced:
- `out.electricity.clothes_dryer.energy_consumption_intensity`, COP/CEF provided or use [default](#defaults)

Then define the following variables:
- *<span id="electricity-site-impacted">Electricity Site Impacted</span> Columns*: The columns selected above related to electricity.
- *<span id="avoided-fuel-impacted">Avoided Fuel Impacted</span> Columns*: The columns selected above related to the avoided fuel.

### 4. Find the representative NREL building for each square footage bin

Using the [NREL metadata](https://data.openei.org/s3_viewer?bucket=oedi-data-lake&prefix=nrel-pds-building-stock%2Fend-use-load-profiles-for-us-building-stock%2F2022%2Fresstock_amy2018_release_1.1%2Fmetadata%2F) that matches the upgrade selected in [Step 1](#1-select-an-nrel-measure-upgrade) table, filter down to the rows of buildings that match the filters from [Step 2](#select-a-subset-of-nrel-buildings).
Then further filter down to select the buildings most representative of the *Site*.
Finally filter related to the square footage of the *Site*. 

Each building is assigned one of 9 square-footage bins, as well as a specific square footage value that varies depending on the building type. The following table enumerates all of the options.

| Building Type                  | 0-499 | 500-749 | 750-999 | 1000-1499 | 1500-1999 | 2000-2499 | 2500-2999 | 3000-3999 | 4000+ |
|--------------------------------|-------|---------|---------|-----------|-----------|-----------|-----------|-----------|-------|
| Mobile Home                    | 328.0 | 633.0   | 885.0   | 1220.0    | 1690.0    | 2176.0    | 2663.0    | 3301.0    | 8194.0|
| Multi-Family with 2 - 4 Units  | 333.0 | 617.0   | 853.0   | 1138.0    | 1623.0    | 2115.0    | 2590.0    | 3138.0    | 12291.0|
| Multi-Family with 5+ Units     | 333.0 | 617.0   | 853.0   | 1138.0    | 1623.0    | 2115.0    | 2590.0    | 3138.0    | 12291.0|
| Single-Family Attached         | 317.0 | 617.0   | 866.0   | 1202.0    | 1675.0    | 2152.0    | 2631.0    | 3241.0    | 13414.0|
| Single-Family Detached         | 328.0 | 633.0   | 885.0   | 1220.0    | 1690.0    | 2176.0    | 2663.0    | 3301.0    | 8194.0|

Given this information, we can find the buildings that represent the *Site* for each square footage bin.

1. For each of the buildings in the metadata file, we calculate the sum of the [Electricity Site Impacted](#electricity-site-impacted) columns to get our estimate on the 'electricity site impacted usage per-sqft' of each building.
2. For each of the square footage bins, we record the building id and assigned square footage of the building that has the **median** 'electricity site impacted usage per-sqft'. *(The assigned square footage for each bin varies according to the table described above.)* The resulting values should look something like the table below.

| | 0-499 | 500-749 | 750-999 | 1000-1499 | 1500-1999 | 2000-2499 | 2500-2999 | 3000-3999 | 4000+ |
|--------------------------------|-------|---------|---------|-----------|-----------|-----------|-----------|-----------|-------|
| Building ID  | 1234 | 9876   | 1111   | 2222    | 8675309    | 36912    | 12121    | 345677    | 815353|
| Sq-Ft  | 333.0 | 617.0   | 853.0   | 1138.0    | 1623.0    | 2115.0    | 2590.0    | 3138.0    | 12291.0|

### 4. Calculate the 8760 Loadshapes for Electricity Site Impacts and Avoided Fuel Impacts

Given the square footage of the *Site*, select the building id of the bin that is closest in square footage.
For example, if the *Site* square footage was 700 sqft, we would select building `9876`.

Using the NREL [timeseries](https://data.openei.org/s3_viewer?bucket=oedi-data-lake&prefix=nrel-pds-building-stock%2Fend-use-load-profiles-for-us-building-stock%2F2022%2Fresstock_amy2018_release_1.1%2Ftimeseries_individual_buildings%2F) data, query the 8760 loadshapes for this buildings for both the baseline and the "Measure Upgrade" scenario. 

Sum the Electricity Site Impact `*.consumption_intensity` columns from the "Measure Upgrade" dataset and multiply the result by the square footage of the *Site*. This represents the *Electricity Site Impact Loadshape*.

Sum the Avoided Fuel Impact `*.consumption_intensity` columns from the "Baseline" dataset and multiply the result by the square footage of the *Site*. This represents the *Avoided Fuel Impact Loadshape*.

### 4. Calculate the 8760 Loadshapes for Useful Heat EACs

Each column in the Useful Heat EACs represents a different type of heating appliance with a unique performance rating.
In general, the idea of this step is to take the electricity usage for appliances that have a COP > 1 and attempt to measure how much Useful Heat was generated from those appliances.

> [!NOTE]
> NREL has made certain assumptions around the appliances used in the models, which we will use to determine default efficiency factors for the COPs of each appliance.
> However, these calculations can alternatively use COP values that are provided based on the actual *Asset* specifications.

The following assumptions are made to convert provided efficiency factor values to a COP.

The following table contains the potential electricity columns and the default COPs to use based on NRELs modeling.
In some cases these were based off of spec sheets that shared the COP@47° as well as the efficiency factor.
 
- HSPF -> COP: 1/3.412
- UEF -> COP: 1.14
- CEF -> COP: 0.7

| Appliance | COP | Used for Useful Heat | 
|-----------|-------|---------|
| \*.heating.\* | 2.6 or 4.1* | Yes |
| \*.hot_water.\* | 3.9 | Yes |
| \*.clothes_dryer.\* | 3.6 | Yes |
| \*.heating_fans_pumps.\*  | N/A | No   | 
| \*heating_hp_bkup.\* | N/A | No |

For each relevant column in the "Measure Upgrade" dataset for the building id that was previously selected, multiply the column's `*.consumption_intensity` by the square footage of the *Site*, and then by the relevant COP for that column.
Sum these columns together to get the *Useful Heat EAC Loadshape*.

#### 4. Apply the 8760 loadshapes to the present time

The 8760 loadshapes from the NREL dataset represent estimates of consumption and savings for every hour of 2018. We need to remap these savings to the present day.

> [!NOTE]
> In future work, we will consider weather normalizing our estimations through a method such as [eemeter](https://github.com/openeemeter/eemeter).

To remap the 2018 time slice to the present day, (***to-do)

### 5. Calculate the carbon impacts of the EACs

In order to calculate the hourly net carbon impact, we need to calculate the carbon impact of the increased electricity usage as well as the carbon saved from the avoided fuel. 

The net emissions for each EAC is assigned that hour's **avoided emissions** subtracted by that hour's **consumed emissions**. The calculation for these emissions is described below.

#### Avoided Emissions

For the avoided fuel calculation, we use the CO2e emissions factors that are derived from Table 7.1.2(1) National Average Emissions Factors for Household Fuels from draft ANSI/RESNET/ICCC 301 Standard for the Calculation and Labeling of the Energy Performance of Dwelling and Sleeping Units using an Energy Rating Index ([link](https://www.resnet.us/about/standards/resnet-ansi/draft-pds-01-bsr-resnet-icc-301-2022-addendum-b-co2-index/)).
This is [the same approach used by NREL ResStock](https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2022/EUSS_ResRound1_Technical_Documentation.pdf#page=9).
    
- Natural Gas: ~0.228 kg/kWh
- Fuel Oil: ~0.303 kg/kWh

We multiply the relevant emissions factor with the *Avoided Fuel Site Impact Loadshape* to get the avoided carbon emissions.

#### Consumed Emissions
In order to calculate the increased emissions generated through the electricity usage of the *Asset*, we multiply the *Electricity Site Impact Loadshape* by the hourly grid carbon intensity, based on the balancing authority that the *Site* resides in. 

> [!NOTE]
> Additional information about how methods of calculating grid carbon intensities can be found in the [Carbon Intensity Methodologies]() set of documents in this repository.

## Caveats
- NREL sized their heat pump units using Measure J, which tends to undersize the heat pumps particularly in cold climates. Future work will be required to handle this discrepency.
- We are using a single COP value to multiply electricity consumption into Useful Heat, however the COP varies widely depending on the outside temperature.

