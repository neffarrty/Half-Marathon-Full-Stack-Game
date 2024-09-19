export default function Coins({ amount, max }) {
    return (
        <div className='coins-container'>
            {[...Array(max)].map((x, i) =>
                <div key={i} className={'coin'.concat(i < amount ? '' : ' inactive')} />
            )}
        </div>
    );
};