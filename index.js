import fastify from 'fastify';
import axios from "axios";
// see axios doc on how to use it

const app = fastify({logger: true});

const getCatFacts = async () => {
    const url ='https://cat-fact.herokuapp.com/facts/random?amount=3';
    const {data} = await axios.get(url);
    data.forEach( d => console.log(d.text));
};

const getFoxImage = async () => {
    const url ='https://randomfox.ca/floof/';
    const {data} = await axios.get(url);
    console.log(data.image);
};

const getCountryHour = async () => {
    const url ='https://date.nager.at/api/v2/publicholidays/2021/CU';
    const {data} = await axios.get(url);
    data.forEach( d => console.log(d.date));
};


app.get('/', async (req, res) => {
  return {
    message: `Welcome to Node Babel with ${
      req.body?.testValue ?? 'no testValue'
    }`,
  };
});

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
getCatFacts();
getFoxImage();
getCountryHour();
