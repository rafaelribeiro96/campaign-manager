import React from "react";
import Layout from "../../components/Layout";
import CampaignList from "./CampaignList";

const CampaignPage: React.FC = () => {
  return (
    <Layout>
      <CampaignList />
    </Layout>
  );
};

export default CampaignPage;
