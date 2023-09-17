// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";
import Fuse from 'fuse.js'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}

var cache = []
var fuse
export default async function handler(req, res) {
  // console.log(req.query)
  if (req.query.term == null || req.query.term == "") { return res.status(400).send({ error: 'Query error' })};
  if (cache.length == 0) {
    const client = await clientPromise;
    const db = client.db("colleges");
    const projection = {
      _id: 0,
      name: 1,
      location: 1,
      path:1,
      // score: { $meta: "textScore" },
    };  
    cache = await db.collection("all").find().project(projection).toArray();
    console.log(cache)
    fuse = new Fuse(cache, {
      threshold:.3,
      keys: [
        "name",
        "location"
      ]
    });
  }
  let result = fuse.search(req.query.term)
  // console.log(result)
  res.status(200).json(result)
}

let x = {
  "name": "University of Notre Dame",
  "path": "university-of-notre-dame",
  "aliases": [],
  "image": "https://law.nd.edu/assets/306489/fullsize/om2009_aerial_god_quad_vert.jpg",
  "location": "Notre Dame, IN",
  "googleMaps": "https://goo.gl/maps/fmKGkce3HbsH9ag59",
  "type1": "Private",
  "type2": "University",
  "gender": "coed",
  "mission": "",
  "hidden": true,
  "verified": false,
  "general": {
    "undergradPopulation": 8973,
    "stfRatio": 8.9,
    "gr4year": 90,
    "gr6year": 96,
    "housing": {
      "guaranteed": false,
      "note": "Housing is available but not guaranteed."
    }
  },
  "cost": {
    "tuition": 60301,
    "roomAndBoard": 16710,
    "other": 3200,
    "total": 80211
  },
  "finAid": {
    "demonstratedNeedMet": null,
    "meritBased": "None",
    "costCalculator": "https://npc.collegeboard.org/app/nd"
  },
  "stats": {
    "acceptanceRates": [
      {
        "source": "Common Data Set 2017-2018",
        "term": "Fall 2017",
        "applied": 884,
        "admitted": 235,
        "rate": 26.6
      },
      {
        "source": "Common Data Set 2018-2019",
        "term": "Fall 2018",
        "applied": 869,
        "admitted": 198,
        "rate": 22.8
      },
      {
        "source": "Common Data Set 2019-2020",
        "term": "Fall 2019",
        "applied": 760,
        "admitted": 229,
        "rate": 30.1
      },
      {
        "source": "Common Data Set 2020-2021",
        "term": "Fall 2020",
        "applied": 734,
        "admitted": 319,
        "rate": 43.5
      },
      {
        "source": "Common Data Set 2021-2022",
        "term": "Fall 2021",
        "applied": 4942,
        "admitted": 2051,
        "rate": 41.5
      }
    ],
    "averageGPA": "3.8",
    "latestData": {
      "source": "Common Data Set 2021-2022",
      "term": "Fall 2021",
      "applied": 4942,
      "admitted": 2051,
      "rate": 41.5
    }
  },
  "howToApply": {
    "applications": {
      "commonApp": false,
      "coalitionApp": false,
      "others": [
        {
          "name": "Proprietary Application",
          "url": "https://admissions.nd.edu/apply/resources-for/transfer-applicants/apply/"
        }
      ]
    },
    "enrollmentTerms": {
      "fall": {
        "deadline": "March 15th"
      },
      "spring": {
        "deadline": "October 1st"
      }
    },
    "essays": {
      "answer": true,
      "note": "Yes"
    },
    "testing": {
      "answer": "Optional",
      "note": "Optional"
    },
    "interview": {
      "answer": "Not Accepted",
      "note": "Not Accepted"
    },
    "lettersOfRecommendation": {
      "quantity": 0,
      "note": "Optional but encouraged"
    },
    "hsTranscript": {
      "answer": "Required",
      "note": "Required"
    },
    "fee": "$75",
    "feeWaivers": null,
    "rolling": true,
    "extra": null
  },
  "policies": {
    "needBlind": {
      "answer": true,
      "note": "Yes"
    },
    "minGPA": {
      "answer": 3,
      "note": ""
    },
    "minCredits": {
      "qty": 27,
      "note": "27 credits when applying"
    },
    "maxCredits": {
      "qty": 60,
      "note": "60 credits"
    },
    "requiredCourses": {
      "answer": true,
      "overview": "Yes, click here to view.",
      "url": "https://admissions.nd.edu/apply/resources-for/transfer-applicants/courses-required/"
    },
    "onlineCourses": {
      "answer": false,
      "note": "Only online courses from spring semester of 2020 through the summer of 2021 will be accepted."
    },
    "extra": {
      "message": "The actuary minor and BA track of computer science are currently closed to transfers."
    }
  },
  "usefulLinks": {
    "reviews": [
      {
        "url": "https://www.usnews.com/best-colleges/university-of-notre-dame-1840",
        "name": "U.S. News"
      },
      {
        "url": "https://www.niche.com/colleges/university-of-notre-dame/",
        "name": "Niche"
      }
    ],
    "official": [
      {
        "url": "https://umich.edu",
        "name": "University of Notre Dame's Website"
      },
      {
        "url": "https://admissions.umich.edu/apply/transfer-applicants",
        "name": "University of Notre Dame's Transfer Page"
      }
    ]
  },
  "contact": {
    "email": "admissions@nd.edu",
    "phone": "15746317505"
  },
  "sources": [
    {
      "url": "https://admissions.nd.edu/apply/resources-for/transfer-applicants/",
      "name": "University of Notre Dame's Transfer Page"
    },
    {
      "url": "https://admissions.nd.edu/apply/resources-for/transfer-applicants/courses-required/",
      "name": "University of Notre Dame's Transfer Course Requirements Page"
    },
    {
      "url": "https://admissions.nd.edu/apply/resources-for/transfer-applicants/housing-for-transfers/",
      "name": "University of Notre Dame's Transfer Housing Page"
    },
    {
      "url": "https://admissions.nd.edu/apply/resources-for/transfer-applicants/timeline-instructions/",
      "name": "University of Notre Dame's Transfer Application Instructions Page"
    },
    {
      "url": "https://admissions.nd.edu/aid-affordability/funding-types/",
      "name": "University of Notre Dame's Funding Types Page"
    },
    {
      "url": "https://admissions.nd.edu/aid-affordability/",
      "name": "University of Notre Dame's Aid & Affordability Page"
    },
    {
      "url": "https://financialaid.nd.edu/how-aid-works/cost-of-attendance/",
      "name": "University of Notre Dame's Cost of Attendance Page"
    },
    {
      "name": "Common Data Set 2021-2022",
      "url": "https://www3.nd.edu/~instres/CDS/2021-2022/CDS_2021-2022.pdf"
    },
    {
      "name": "Common Data Set 2020-2021",
      "url": "https://www3.nd.edu/~instres/CDS/2020-2021/CDS_2020-2021.pdf"
    },
    {
      "name": "Common Data Set 2019-2020",
      "url": "https://www3.nd.edu/~instres/CDS/2019-2020/CDS_2019-2020.pdf"
    },
    {
      "name": "Common Data Set 2018-2019",
      "url": "https://www3.nd.edu/~instres/CDS/2018-2019/CDS_2018-2019.pdf"
    },
    {
      "name": "Common Data Set 2017-2018",
      "url": "https://www3.nd.edu/~instres/CDS/2017-2018/CDS_2017-2018.pdf"
    },
    {
      "name": "Common Data Set 2016-2017",
      "url": "https://www3.nd.edu/~instres/CDS/2016-2017/CDS_2016-2017.pdf"
    },
    {
      "name": "Common Data Set 2015-2016",
      "url": "https://www3.nd.edu/~instres/CDS/2015-2016/CDS_2015-2016.pdf"
    },
    {
      "name": "Common Data Set 2014-2015",
      "url": "https://www3.nd.edu/~instres/CDS/2014-2015/CDS_2014-2015.pdf"
    },
    {
      "name": "Common Data Set 2013-2014",
      "url": "https://www3.nd.edu/~instres/CDS/2013-2014/CDS_2013-2014.pdf"
    }
  ],
  "tags": []
}