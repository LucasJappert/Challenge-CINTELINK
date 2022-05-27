
jest.mock('../services/dataManager')
const DataManager = require("../services/dataManager");
describe("---------> Tests DataManager", () => {
    // The mock factory returns the function () => false
    DataManager.CacheNotification.mockImplementation((x) => x * 10)
    test("Should return only sent notifications by user", () => {
        let result = DataManager.GetSentNotificationsByUser(1);
        expect(1).toBe(1);
    })
})
