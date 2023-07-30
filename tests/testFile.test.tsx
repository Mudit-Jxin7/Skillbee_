import axios from "axios";
import { fetchDataFromApi, ActivityData } from "../main"; // Replace "yourFileName" with the actual filename

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const sampleData: ActivityData = {
  key: "1",
  activity: "Test Activity",
  price: 10,
  accessibility: 0.5,
};

console.error = jest.fn(); // Mock console.error

describe("fetchDataFromApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data from the API successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: sampleData });

    const data = await fetchDataFromApi();

    expect(data).toEqual(sampleData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://www.boredapi.com/api/activity"
    );
  });

  it("should handle API error gracefully", async () => {
    const errorMessage = "Test API Error";

    mockedAxios.get.mockRejectedValueOnce({ error: new Error(errorMessage) });

    const data = await fetchDataFromApi();

    expect(data).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching data from the API:",
      { error: new Error(errorMessage) }
    );
  });
});
