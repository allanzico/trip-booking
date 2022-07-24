import Analytics  from 'analytics-node'


export class AnalyticsClass {
  async getAnalytics() {
    var analyticsKey = <string> process.env?.['TWILIO_ANALYTICS_KEY'];
    var analytics = new Analytics(analyticsKey);

   return analytics.identify({
        userId:'62cd2b469858343d72f2ee89',
        traits: {
          name: 'Allan Akanyijuka',
          email: 'test@gmail.com',
        }
      });
  }
}