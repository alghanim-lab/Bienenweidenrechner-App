import React from 'react'
import { useReducer } from "react";
import {
  BluehstreifenReducer,
  initialState,
} from "./BluehstreifenReducer";import Container from './Container';

export function Controller() {
  const [state, dispatch] = useReducer(BluehstreifenReducer, initialState);

  return { state , dispatch }
  
}
