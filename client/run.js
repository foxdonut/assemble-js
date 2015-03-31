require(["wire", "./main"], function(wire, main) {
  console.log("main:", main);
  console.log("main (json):", JSON.stringify(main));
  wire(main);  
});
