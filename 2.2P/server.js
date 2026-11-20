var express = require("express")
const path = require('path');
var app = express()
var port = process.env.port || 3003;

app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to calculate the addition of a number
// Example: http://localhost:3000/addition?num=5&num2=3
app.get('/addition', (req, res) => {
  const num = parseFloat(req.query.num);
  const num2 = parseFloat(req.query.num2);
  
  if (isNaN(num)) {
    return res.send("Error: Please provide a valid number using query parameter 'num'.");
  }
  if (isNaN(num2)) {
    return res.send("Error: Please provide a valid number using query parameter 'num2'.");
  }
  
  const addition = num + num2;
  res.send(`The result of ${num} plus ${num2} is: ${addition}`);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});