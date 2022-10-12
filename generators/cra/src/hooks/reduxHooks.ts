import { useCallback, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import objectEqual from "core-utils/objectEqual";

import { AppDispatch, RootState } from "_redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFN = objectEqual
) => useSelector(selector, equalityFN);

export const useLoading = (initialState = 0) => {
  const [loadingProcesses, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => {
    setIsLoading((prev) => prev + 1);
  }, []);
  const stopLoading = useCallback(() => {
    setIsLoading((prev) =>
      Math.max(prev - 1 === initialState ? 0 : prev - 1, 0)
    );
  }, []);

  return { startLoading, stopLoading, isLoading: loadingProcesses > 0 };
};

export const useLoadingDispatch = (initialState = 0) => {
  const classicDispatch = useAppDispatch();
  const { startLoading, stopLoading, isLoading } = useLoading(initialState);

  const dispatch = useCallback(
    async (callback: ThunkAction<unknown, RootState, undefined, AnyAction>) => {
      startLoading();
      try {
        const response = await classicDispatch(callback);

        stopLoading();

        return response;
      } catch (error) {
        stopLoading();
      }
    },
    [classicDispatch, startLoading, stopLoading]
  ) as typeof classicDispatch;

  return {
    isLoading,
    dispatch,
    startLoading,
    stopLoading,
    classicDispatch,
  };
};
