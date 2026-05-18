let customerAge = 8;
let ticketPrice;

if(customerAge < 12){
    ticketPrice = 500;
}
else if(customerAge > 60){
    ticketPrice = 600;
}
else{
    ticketPrice = 1000;
}

console.log("Your ticket price is : Rs."+ ticketPrice);
