import ResultBox from './ResultBox';
import { render, screen, cleaneup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
  

describe('Component ResultBox', () => {

    const testCases = [
        { amount: 16},
        { amount: 500},
        { amount: 423},
        { amount: 280},
  ];

  const minusCases = [
    { amount: -60, from: 'PLN', to: 'USD' },
    { amount: -832, from: 'PLN', to: 'USD' },
    { amount: -50, from: 'USD', to: 'PLN' },
    { amount: -123, from: 'USD', to: 'PLN' },
  ];

  
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
});
    it('should render proper info about conversion when PLN -> USD', () => {
        for(const testObj of testCases) {
        render(<ResultBox from="PLN" to="USD" amount={testObj.amount}   />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 100.00 = $28.57');


        cleaneup();
    };
});

it('should render proper info about conversion when USD -> PLN', () => {
    for(const testObj of testCases) {
    render(<ResultBox from="USD" to="PLN" amount={testObj.amount}   />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('USD 100.00 = 350');

    cleaneup();
    };
});
it('should be the same when PLN = PLN', () => {
    for(const testObj of testCases) {
        render(<ResultBox from="PLN" to ="PLN" amount={testObj.amount}   />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 100.00 = 100');

        cleaneup();
    }
});
it('should be the same when USD = USD', () => {
    for(const testObj of testCases) {
        render(<ResultBox from="USD" to ="USD" amount={testObj.amount}   />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('USD 100.00 = 100');

        cleaneup();
    }
});
it('there should be a warning when the value is below 0', () => {
    for(const minusObj of minusCases) {
        render(<ResultBox from={minusObj.from} to={minusObj.from} amount={minusObj.from}   />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('WRONG VALUE...');

        cleaneup();
    }
})


});