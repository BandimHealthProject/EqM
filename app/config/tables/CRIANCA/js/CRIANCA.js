/**
 * This is the file that will create the list view for the table.
 */
/* global $, odkCommon, odkData, odkTables, util, listViewLogic */
/* exported display, handleClick, getResults */
'use strict';


var listQuery = 'SELECT * FROM CRIANCA';

var searchParams = '(MOR LIKE ?)';

function resumeFunc(state) {
    if (state === 'init') {
        // set the parameters for the list view
        listViewLogic.setTableId('CRIANCA');
        listViewLogic.setFormId('CRIANCA_LV');
        listViewLogic.setListQuery(listQuery);
        listViewLogic.setSearchParams(searchParams);
        listViewLogic.setListElement('#list');
        listViewLogic.setSearchTextElement('#search');
        listViewLogic.setLimitElement('#limitDropdown');
        listViewLogic.setPrevAndNextButtons('#prevButton', '#nextButton');
        listViewLogic.setNavTextElements('#navTextLimit', '#navTextOffset', '#navTextCnt');
        listViewLogic.showEditAndDeleteButtons(false);
        listViewLogic.setLastvisit('LASTVISIT');
        
        listViewLogic.detailView(false);
     
        listViewLogic.setColIdsToDisplayInList(null, 'NAME',
        		'Relação 1', 'RELA1', null, 'RELA1NOME', 
        		'Relação 2', 'RELA2', null, 'RELA2NOME',
        		'Morança', 'MOR', 'Casa', 'CASA', 'Fogao', 'FOGAO');
    }

    listViewLogic.resumeFn(state);
}

function clearListResults() {
    listViewLogic.clearResults();
}

function prevListResults() {
    listViewLogic.prevResults();
}

function nextListResults() {
    listViewLogic.nextResults();
}

function getSearchListResults(){
    listViewLogic.getSearchResults();
}

function newListLimit(){
    listViewLogic.newLimit();
}