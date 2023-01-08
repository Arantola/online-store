const asd = require('../modules/Cart.ts')
function expect(value) {
    return {
        toBe: exp => {
            if (value === exp) {
                console.log('Success');
            } else {
                console.error(`Value is ${value}, but expectation is ${exp}`);
            }
        }
    }
}

test("find my number", () => {
    expect(asd(24.99,true)).toBe(22.99)
})
//https://www.youtube.com/watch?v=IEDe8jl5efU
