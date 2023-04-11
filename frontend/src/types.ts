export type AppDataName =
  | "TIMESTAMP_MAGIC"
  | "TIMESTAMP_WAKE"
  | "TIMESTAMP_SLEEP"
  | "FLAG_HELP"
  | "KEY";
export type AppData = Partial<Record<AppDataName, number>>;

export type AppStepName =
  | "MODAL_OPEN_1"
  | "MODAL_OPEN_2"
  | "SLEEP"
  | "SAVING"
  | "FETCH_DATA_TRIGGER";
export type AppStep = Partial<Record<AppStepName, string | number | undefined>>;

export type AppState = {
  appData: AppData;
  appStep: AppStep;
};

export interface SetAppDataProps {
  name: AppDataName;
  value?: number;
  clear?: boolean;
}
export interface SetAppStepProps {
  name: AppStepName;
  value?: number | string;
  clear?: boolean;
}

declare global {
  interface Window {
    APP_DATA_INIT: AppData;
  }
}
