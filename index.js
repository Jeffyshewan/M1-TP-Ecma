import fastify from 'fastify';
import axios from "axios";
// see axios doc on how to use it

const app = fastify({logger: true});

const getCatFacts = async () => {
    try {
    const url =`https://cat-fact.herokuapp.com/facts/random?amount=3`;
    const {data} = await axios.get(url);
    data.forEach( d => console.log(d.text));
    return data.map((item) => item.text);
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getFoxImage = async () => {
    try {
    const url =`https://randomfox.ca/floof/`;
    const {data} = await axios.get(url);
    console.log(data.image);
    return data.image;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getCountryDays = async (countrycode) => {
    try {
    const url =`https://date.nager.at/api/v2/PublicHolidays/2021/${countrycode}`;
    const {data} = await axios.get(url);
    data.forEach( d => console.log(d.date));
    return data.map((item) => item.date);
    } catch (err) {
        console.log(err);
        return null;
    }
};


app.post('/' , async (req, res) => {
    let countrycode = req.body?.countryCode;
    console.log(req.body);

    console.log(countrycode);
    const [catFacts, foxImage, holidays] = await Promise.all([
        getCatFacts(),
        getFoxImage(),
        getCountryDays(countrycode),
    ]);
    return {
        foxImage,
        catFacts,
        holidays,
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
