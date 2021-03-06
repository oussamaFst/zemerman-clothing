import React from 'react'
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import {updateCollections} from '../../redux/shop/shop.actions'

import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

import WhithSpinner from '../../components/with-spiner/with-spiner.component';

const CollectionsOverviewWithSpinner = WhithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WhithSpinner(CollectionPage);


class ShopPage extends React.Component {

    unsubscribeFromSnapshot = null

    state = {
        loading: true
    };


    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot=collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading
        } = this.state;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null,mapDispatchToProps)(ShopPage);
