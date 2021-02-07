// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

module.exports = (client, msg, args) => {
  if (args.length > 0 && /^\d+$/.test(args[0])) {
    msg.channel.send(`Number set to ${args[0]}`);

    //loading the number model
    const NumberModel = client.db.model("number");

    //reading all documents
    NumberModel.find({}, (error, data) => {
      if (error) console.error();
      console.log(data);
    });

    //saving a document
    const newNumber = new NumberModel();
    newNumber.value = args[0];
    newNumber.save();
  } else {
    msg.channel.send(`Please provide a valid whole number.`);
  }
};
