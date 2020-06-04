// root/index page
import Layout from '../components/Layout';
import Fetch from 'isomorphic-unfetch';
import Prices from '../components/Prices'


const Index = (props) => (
    <div>
        <Layout />
        <h1>Welcome to Next.js</h1>
        <p>Check current USD to Bitcoin rate</p>
        <Prices bpi={props.bpi}/>
    </div>
);

// Next.js lifecycle method

Index.getInitialProps = async function() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    
    // returns json type
    const data = await res.json();
    return {
        // keys are the different currency types USD, GBP etc
      bpi: data.bpi
    };
}

export default Index;