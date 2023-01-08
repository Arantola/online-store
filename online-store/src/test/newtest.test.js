const { CalculateDisc, checkString } = require ('../modules/Cart.ts')

test("find my discount", () => {
    expect(CalculateDisc(24.99,10)).toBe(22.49)
})
test("added string to address", () => {
    expect(checkString(["asdasdasd", "asdasd", "asda"])).not.toBeTruthy()
})
//https://www.youtube.com/watch?v=IEDe8jl5efU
