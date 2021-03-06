import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { Localized } from 'fluent-react/compat';
import { Grid, Row } from 'react-bootstrap';

import CampaignTile from './CampaignTile.js';
import CampaignTileCurrent from './CampaignTileCurrent.js';

import './CampaignsListing.css';

class CampaignsListing extends Component {

  render() {

    let activeCampaign = <div></div>;
    if (this.props.activeCampaign) {

      const campaign = {...this.props.activeCampaign};

      activeCampaign =  (<section className="campaign">
        <Localized id="campaign-active">
          <h1 className="title text--centered"></h1>
        </Localized>
        <Localized id="campaign-active-description">
          <p className="text text--lead text--centered"></p>
        </Localized>
        <CampaignTileCurrent
          titleImage={campaign.titleImage}
          titleKey={campaign.titleKey}
          descriptionKey={campaign.descriptionKey}
          durationKey={campaign.durationKey}
          buttonKey = {campaign.buttonKey}
          linkTarget={campaign.linkTarget}
        />
      </section>
      )
    }

    return (
      <Localized id="campaigns-document-title" attrs={{title: true}}>
      <DocumentTitle>
      <React.Fragment>
        {activeCampaign}
        <section className="campaign-list">
          <Localized id="campaign-archive">
            <h1 className="title title--extra-extra-large text--centered"></h1>
          </Localized>
          <div className="content-contained content-contained--small">
            <Localized id="campaign-archive-description">
              <p className="text text--lead text--centered"></p>
            </Localized>
          </div>
        <Grid>
          <Row className="campaign-list__row">
          <CampaignTile
            titleImage="/images/firefox-fights.jpg"
            titleKey="firefox-fights-title"
            descriptionKey="firefox-fights-description"
            durationKey="firefox-fights-duration"
            linkTarget="https://events.mozilla.org/firefoxfightsforyoucampaign"
          ></CampaignTile>
          <CampaignTile
              titleImage="/images/dark-funnel.jpg"
              titleKey="dark-funnel-title"
              descriptionKey="dark-funnel-description"
              durationKey="dark-funnel-duration"
              linkTarget="https://events.mozilla.org/darkfunnelEN"
            ></CampaignTile>
            <CampaignTile
              titleImage="/images/firefox-addons.jpg"
              titleKey="firefox-addons-title"
              descriptionKey="firefox-addons-description"
              durationKey="firefox-addons-duration"
              linkTarget="https://discourse.mozilla.org/t/the-add-on-localization-campaign-is-happening-join-us/29432"
            ></CampaignTile>
            <CampaignTile
              titleImage="/images/firefox-support.jpg"
              titleKey="firefox-support-title"
              descriptionKey="firefox-support-description"
              durationKey="firefox-support-duration"
              linkTarget="https://supportsprint.mozilla.community/"
            ></CampaignTile>
            <CampaignTile
              titleImage="/images/common-voice.jpg"
              titleKey="common-voice-title"
              descriptionKey="common-voice-description"
              durationKey="common-voice-duration"
              linkTarget="https://voice-sprint.mozilla.community/"
            ></CampaignTile>
            <CampaignTile
              titleImage="/images/adhaar.jpg"
              titleKey="adhaar-title"
              descriptionKey="adhaar-description"
              durationKey="adhaar-duration"
              linkTarget="https://foundation.mozilla.org/en/campaigns/aadhaar/"
            ></CampaignTile>
            <CampaignTile
              titleImage="/images/new-firefox.jpg"
              titleKey="new-firefox-title"
              descriptionKey="new-firefox-description"
              durationKey="new-firefox-duration"
              linkTarget="https://newfirefox.mozilla.community/"
            ></CampaignTile>
            <CampaignTile
              titleImage="/images/quantum-sprint.jpg"
              titleKey="quantum-sprint-title"
              descriptionKey="quantum-sprint-description"
              durationKey="quantum-sprint-duration"
              linkTarget="https://firefoxsprint.mozilla.community/"
            ></CampaignTile>
          </Row>
        </Grid>
      </section>
    </React.Fragment>
    </DocumentTitle>
    </Localized>
    );
  }
}

const mapStateToProps = (state) => ({
  currentLocales: state.language.currentLocales,
  activeCampaign: state.campaign.active,
});

export default connect(mapStateToProps)(CampaignsListing);
