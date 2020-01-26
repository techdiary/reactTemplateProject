export const SET_FETCHING = "SET_FETCHING";
export interface SetFetching {
	type: string;
	data: boolean;
}
export const isFetching = (isFetching: boolean): SetFetching => {
	return { type: SET_FETCHING, data: isFetching };
};