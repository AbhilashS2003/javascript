describe("Raises x to the power n", function() {
    let x = 5;
    let result=x;

    it("5 to the pow of 1 is 5",function(){
      assert.equal(pow(x, 1), result);
    });

    it("5 to the pow of 2 is 25",function(){
      result *= x;
      assert.equal(pow(x, 2), result);
    });
    
    it("5 to the pow of 3 is 125",function(){
      result *= x;
      assert.equal(pow(x, 3), result);
    });
  });