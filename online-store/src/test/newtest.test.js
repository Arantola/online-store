const { CalculateDisc, checkString, TakeNumber, cheackRegex, RegNotNull} = require ('../modules/Cart.ts')

test("find my discount", () => {
    expect(CalculateDisc(24.99,10)).toBe(22.49)
})
test("added string to address", () => {
    expect(checkString(["asdasdasd", "asdasd", "asda"])).not.toBeTruthy()
})

test("check length string", () => {
    expect(TakeNumber("12331233123")).toHaveLength(3)
})
test("check regexp card number", () => {
    expect(cheackRegex("^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}")).toBeInstanceOf(RegExp)
})
test("regexp card number not null", () => {
    expect(RegNotNull(/^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}/, "1323 2312 3123 1231")).toBeNull()
})
// test("check length string", () => {
//     expect(checkString(["asdasdasd", "asdasd", "asda"])).toBeGreaterThan(3)
// })
// test("added string to address", () => {
//     expect(checkString(["asdasdasd", "asdasd", "asda"])).toBeGreaterThanOrEqual()
// })
// test("added string to address", () => {
//     expect(checkString(["asdasdasd", "asdasd", "asda"])).toBeLessThan()
// })
// test("added string to address", () => {
//     expect(checkString(["asdasdasd", "asdasd", "asda"])).toBeLessThanOrEqual()
// })
// test("added string to address", () => {
//     expect(checkString(["asdasdasd", "asdasd", "asda"])).toMatch()
// })
// test("added string to address", () => {
//     expect(checkString(["asdasdasd", "asdasd", "asda"])).not.toBeTruthy()
// })
//https://www.youtube.com/watch?v=IEDe8jl5efU
