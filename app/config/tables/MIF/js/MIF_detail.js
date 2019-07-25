/**
 * The file for displaying detail views of the Health Facilities table.
 */
/* global $, odkTables, util, odkData */
'use strict';

var MIFResultSet = {};

function onAddVisitClick() {
	odkTables.editRowWithSurvey(null, 'MIF', MIFResultSet.get('_id'), 'MIF_LV', null, null);
}


function onLinkClick() {
    if (!$.isEmptyObject(MIFResultSet))
    {
        var rowIdQueryParams = util.getKeyToAppendToChildURL(util.motherId, MIFResultSet.get('_id'));
        odkTables.launchHTML(null, 
            'config/tables/CRIANCA/html/CRIANCA.html' + rowIdQueryParams);
    }
}

function onAddChildClick() {
    var jsonMap = {};
    jsonMap.ID = MIFResultSet.getRowId(0);
	
    odkTables.addRowWithSurvey(null, 'CRIANCA', 'CRIANCA', null, jsonMap);
}

function cbSuccess(result) {

    MIFResultSet = result;

     var access = MIFResultSet.get('_effective_access');

    if (access.indexOf('w') !== -1) {
        var editButton = $('#editFacilityBtn');
        editButton.removeClass('hideButton');
    }

    if (access.indexOf('d') !== -1) {
        var deleteButton = $('#delFacilityBtn');
        deleteButton.removeClass('hideButton');
    }

    odkData.query('CRIANCA', 'ID = ?', [MIFResultSet.get('_id')],
        null, null, null, null, null, null, true, refrigeratorsCBSuccess, refrigeratorsCBFailure);
}

function cbFailure(error) {

    console.log('health_facility_detail getViewData CB error : ' + error);
}

function display() {
    var locale = odkCommon.getPreferredLocale();
    $('#basic-facility-information').text(odkCommon.localizeText(locale, "basic_facility_information"));
    $('#health-fac-id').text(odkCommon.localizeText(locale, "health_facility_id"));
    $('#fac-type').text(odkCommon.localizeText(locale, "facility_type"));
    $('#ownership').text(odkCommon.localizeText(locale, "ownership"));
    $('#population').text(odkCommon.localizeText(locale, "population"));
    $('#coverage').text(odkCommon.localizeText(locale, "coverage"));
    $('#admin-reg').text(odkCommon.localizeText(locale, "admin_region"));

    $('#power-information').text(odkCommon.localizeText(locale, "power_information"));
    $('#elec-source').text(odkCommon.localizeText(locale, "electricity_source"));
    $('#grid-avail').text(odkCommon.localizeText(locale, "grid_availability"));
    $('#gas-avail').text(odkCommon.localizeText(locale, "gas_availability"));
    $('#kerosene-avail').text(odkCommon.localizeText(locale, "kerosene_availability"));
    $('#solar-suit-clim').text(odkCommon.localizeText(locale, "solar_suitable_climate"));
    $('#solar-suit-site').text(odkCommon.localizeText(locale, "solar_suitable_site"));

    $('#loc-info').text(odkCommon.localizeText(locale, "location_information"));
    $('#lat-gps').text(odkCommon.localizeText(locale, "latitude_gps"));
    $('#long-gps').text(odkCommon.localizeText(locale, "longitude_gps"));
    $('#clim').text(odkCommon.localizeText(locale, "climate"));

    $('#stk-info').text(odkCommon.localizeText(locale, "stock_information"));
    $('#dist-to-sup-pt').text(odkCommon.localizeText(locale, "distance_to_supply_point"));
    $('#vac-sup-interval').text(odkCommon.localizeText(locale, "vaccine_supply_interval"));
    $('#vac-res-stock-req').text(odkCommon.localizeText(locale, "vaccine_reserve_stock_req"));
    $('#vac-sup-mode').text(odkCommon.localizeText(locale, "vaccine_supply_mode"));

    $('#child').text(odkCommon.localizeText(locale, "refrigerator_inventory"));
    $('#add-child').text(odkCommon.localizeText(locale, "add_refrigerator"));
    $('#add-visit').text(odkCommon.localizeText(locale, "edit_facility"));

    odkData.getViewData(cbSuccess, cbFailure);
}

function refrigeratorsCBSuccess(invData) {

    $('#TITLE').text(MIFResultSet.get('NOMEMAE'));

    $('#facility_id').text(MIFResultSet.get('facility_id'));
    $('#facility_type').text(util.formatDisplayText(MIFResultSet.get('facility_type')));
    $('#facility_ownership').text(util.formatDisplayText(MIFResultSet.get('facility_ownership')));
    $('#facility_population').text(MIFResultSet.get('facility_population'));
    $('#facility_coverage').text(MIFResultSet.get('facility_coverage') + '%');
    $('#admin_region').text(MIFResultSet.get('admin_region'));

    $('#electricity_source').text(util.formatDisplayText(MIFResultSet.get('electricity_source')));
    $('#grid_availability').text(util.formatDisplayText(MIFResultSet.get('grid_power_availability')));
    $('#gas_availability').text(util.formatDisplayText(MIFResultSet.get('gas_availability')));
    $('#kerosene_availability').text(util.formatDisplayText( MIFResultSet.get('kerosene_availability')));
    $('#solar_suitable_climate').text(util.formatDisplayText( MIFResultSet.get('solar_suitable_climate')));
    $('#solar_suitable_site').text(util.formatDisplayText( MIFResultSet.get('solar_suitable_site')));

    $('#climate').text(util.formatDisplayText(MIFResultSet.get('climate_zone')));
    // The latitude and longitude are stored in a single column as GeoPoint.
    // We need to extract the lat/lon from the GeoPoint.
    var lat = MIFResultSet.get('Location.latitude');
    var lon = MIFResultSet.get('Location.longitude');
    $('#lat').text(lat);
    $('#lon').text(lon);

    $('#distance_to_supply').text(MIFResultSet.get('distance_to_supply') + ' km');
    $('#supply_interval').text(MIFResultSet.get('vaccine_supply_interval'));
    $('#stock_requirement').text(MIFResultSet.get('vaccine_reserve_stock_requirement'));
    $('#supply_mode').text(util.formatDisplayText(MIFResultSet.get('vaccine_supply_mode')));

    $('#child_list').text(invData.getCount());

}

function refrigeratorsCBFailure(error) {

    console.log('health_facility_detail refrigerators query CB error : ' + error);
}
