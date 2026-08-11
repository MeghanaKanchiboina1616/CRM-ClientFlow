const calculateLeadScore = (lead) => {
  let score = 0;

  if (lead.source === "Website") {
    score += 10;
  }

  if (lead.email) {
    score += 10;
  }

  if (lead.phone) {
    score += 10;
  }

  if (lead.status === "QUALIFIED") {
    score += 30;
  }

  if (lead.status === "PROPOSAL") {
    score += 30;
  }

  if (lead.status === "WON") {
    score += 40;
  }

  let category = "COLD";

  if (score >= 70) {
    category = "HOT";
  } else if (score >= 40) {
    category = "WARM";
  }

  return {
    score,
    category
  };
};

module.exports = {
  calculateLeadScore
};