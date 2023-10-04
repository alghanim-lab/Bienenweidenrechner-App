import React, { useState, useEffect, useRef, useReducer } from "react";

// bluehstreifenReducer.js
export const initialState = {
  aussaatFläche: "0",
  ausgewähltePflanzenart: null,
  co2InDerStadt: "0",
  ergebnis: [],
  zeigeNeueDialog: false,
  zeigeView: false,
  pflanzenarten: [],
  index: null,
  gemeinsameDaten: {},
  isFlag: false,
};
export function BluehstreifenReducer(state, action) {
  switch (action.type) {
    case "SET_AUSSAAT_FLÄCHE":
      return { ...state, aussaatFläche: action.payload };
    case "SET_AUSGEWÄHLTE_PFLANZENART":
      return { ...state, ausgewähltePflanzenart: action.payload };
    case "SET_CO2_IN_DER_STADT":
      return { ...state, co2InDerStadt: action.payload };
    case "SET_ERGEBNIS":
      return { ...state, ergebnis: action.payload };
    case "SET_ZEIGE_NEUE_DIALOG":
      return { ...state, zeigeNeueDialog: action.payload };
    case "SET_ZEIGE_VIEW":
      return { ...state, zeigeView: action.payload };
    case "SET_PFLANZENARTEN":
      return { ...state, pflanzenarten: action.payload };
    case "SET_INDEX":
      return { ...state, index: action.payload };
    case "SET_GEMEINSAME_DATEN":
      return { ...state, gemeinsameDaten: action.payload };
    case "SET_IS_FLAG":
      return { ...state, isFlag: action.payload };
    default:
      return state;
  }
}
export const data = [
  {
    name: "Buchweizen",
    saatgutProQuadratmeter: 7,
    saatzeitpunkt: "Ab mitte Mai",
    bluetezeit: "Mitte Juni bis Ende Septemper",
    vegetationszeit: 75,
  },
  {
    name: "Sonnenblume",
    saatgutProQuadratmeter: 2.5,
    saatzeitpunkt: "Ab April (im Beet) | Ab mitte Mai (in Töpfen)",
    bluetezeit: "Juni bis Mitte Septemper",
    vegetationszeit: 105,
  },
  {
    name: "Kornblume",
    saatgutProQuadratmeter: 1.5,
    saatzeitpunkt: "Maerz bis Abril",
    bluetezeit: "Ende Juni bis Ende Oktober",
    vegetationszeit: 120,
  },
  {
    name: "Raps",
    saatgutProQuadratmeter: 1.25,
    saatzeitpunkt: "Mitte August bis Anfang Septemper",
    bluetezeit: "Anfang Mai bis Ende Septemper",
    vegetationszeit: 150,
  },
  {
    name: "Gelbsenf",
    saatgutProQuadratmeter: 2,
    saatzeitpunkt: "Ab April",
    bluetezeit: "Anfang Juni bis Mitte Oktober",
    vegetationszeit: 135,
  },
  {
    name: "Bienenweide - Phacelia",
    saatgutProQuadratmeter: 1.3,
    saatzeitpunkt:
      "Ab Mitte April im Hauptfruchtanbau und bis Mitte September im Zwischenfruchtanbau",
    bluetezeit: "Anfang Mai bis Ende Oktober",
    vegetationszeit: 180,
  },
  {
    name: "Klatschmohn",
    saatgutProQuadratmeter: 0.5,
    saatzeitpunkt: "Maers bis April",
    bluetezeit: "Anfang Mai bis Ende Juli",
    vegetationszeit: 60,
  },
  {
    name: "Cephalaria transsylvanica",
    saatgutProQuadratmeter: 3,
    saatzeitpunkt: "Mitte November",
    bluetezeit: "Juni bis August",
    vegetationszeit: 60,
  },
];

export function setDispatch(dispatch, type, payload) {
  return dispatch({ type: type, payload: payload });
}
