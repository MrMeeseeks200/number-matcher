export type Result = [number, number];

export interface ApiResponse {
    result: Result;
    history: Result[];
}