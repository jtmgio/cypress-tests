"use strict";

import { _login } from '../../../common/authenticate-mcadmin';
import { _navigate } from "../../../common/navigate";
import * as headerTests from "./inc/header.spec";
import * as createFormModalTests from "./inc/create-form-modal.spec";
import * as showArchivedFormsTests from "./inc/show-archived-forms.spec";
import * as searchFormsTests from "./inc/search-forms.spec";
import * as tableSortingTests from "./inc/table-sorting.spec";
import * as tableActionTests from "./inc/table-actions.spec";

let test_url = "/";
let orgid = "";
let username = "";
let password = "";

describe("Tests", () => {

    beforeEach(() => {
        Cypress.Cookies.defaults({
            whitelist: ["mcid_token", "serviceID"]
        });
    })

    context("Authenticate", () => {
        _login(orgid, username, password);
    })

    context("Navigation", () => {
        _navigate(test_url);
    })

    context("Forms List -> ", () => {

        describe("Form List Header Toolbar ->", () => {
            headerTests.executeCyTest();
        })

        describe("Create Form Modal ->", () => {
            createFormModalTests.executeCyTest();
        })

        describe("Show Archived Forms ->", () => {
            showArchivedFormsTests.executeCyTest();
        })

        describe("Search for Forms ->", () => {
            searchFormsTests.executeCyTest();
        })

        describe("Table sorting", () => {
            tableSortingTests.executeCyTest();
        })

        describe("Table Actions", () => {
            tableActionTests.executeCyTest();
        })

    })

})