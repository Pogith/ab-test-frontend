export const getUserAgentResult = (visitResults) => {
  const useragents = visitResults?.map((data) => data.useragent);

  const visitByBrowser = {};
  const visitAgent = {};

  useragents?.forEach((data) => {
    const browser = data[0].browser;

    if (visitByBrowser[browser]) {
      visitByBrowser[browser].count++;
    } else {
      visitByBrowser[browser] = {
        name: browser,
        count: 1,
      };
    }

    const agent = data[0].mobile ? "Mobile" : "Desktop";

    if (visitAgent[agent]) {
      visitAgent[agent].count++;
    } else {
      visitAgent[agent] = {
        name: agent,
        count: 1,
      };
    }
  });

  const browserResults = Object.values(visitByBrowser).map((data) => data);
  const agentResults = Object.values(visitAgent).map((data) => data);

  return { browserResults, agentResults };
};

export const getTimeDataResult = (visitResults) => {
  const visitTimeData = visitResults?.map((data) => data.visited_at);

  const visitTime = {};

  visitTimeData?.forEach((data) => {
    if (visitTime[data]) {
      visitTime[data].count++;
    } else {
      visitTime[data] = {
        time: new Date(data),
        count: 1,
      };
    }
  });

  const timeResults = Object.values(visitTime).map((data) => data);

  return timeResults;
};
