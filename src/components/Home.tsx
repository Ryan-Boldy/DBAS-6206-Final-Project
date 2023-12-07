import guitar from "../assets/img/Guitar.png";
import mic from "../assets/img/MicWithStand.png";
import piano from "../assets/img/PianoHands.png";
import guitarline from "../assets/img/GuitarsLinedUp.png";
export default function Home() {
    return (
        <div className='content'style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
            {/* Landscape Photo */}
            <img src={guitar} alt="Guitar in Green Leaves" style={{ maxWidth: '1000px', maxHeight: '300px', marginBottom: '20px', paddingLeft: '60px'}} />

            {/* Text paragraph and three square photos next to each other */}
            <div style={{ display: 'flex', paddingLeft: '7%', paddingRight: '5%'}}>
                {/* Text paragraph to the left */}
                <div style={{ flex: 1, textAlign: 'left', marginRight: '3%' }}>
                    <p>
                    Your Music Depot is the one and only place for young students to learn about the wonders and expression of music. 
                    Offering a wide range of music lessons, Your Music Depot serves as a haven for budding musicians and enthusiasts. 
                    Whether you're seeking to explore a new hobby or hone your musical talents, 'Your Music Depot' provides a conducive environment to learn, practice, and create beautiful harmonies.
                    </p>
                </div>

                {/* Three square photos to the right */}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img src={mic} alt="Mic in a Mic Stand" style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '20px' }} />
                    <img src={piano} alt="Square Photo 2" style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '20px' }} />
                    <img src={guitarline} alt="Square Photo 3" style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '20px' }} />
                </div>
            </div>
        </div>
    );
}