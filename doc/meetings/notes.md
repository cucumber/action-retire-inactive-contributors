## Nov 20, 2024 | [New Contributor Office Hours](https://www.google.com/calendar/event?eid=MHBkb21ramJodDR1ZzNobmZlZjRvZ2wwczBfMjAyNDExMjBUMTgwMDAwWiB2aW5obmd1eWVuaG9hbmc5NkBt)

Attendees:   
[Vinh Nguyễn Hoàng](mailto:vinhnguyenhoang96@gmail.com)

Notes

* Allure Report framework and Godog:  
  * We can make an adapter for Godog to collect and output test results into a standardized format, which then can be used by Allure framework  
* Godog retry feature  
  * Retry by using tags system in Godog and a number of retries in configuration  
  * Retry by returning a step marking how the strategy should run (`godog.ErrRetry` or \`godog.AllowRetries(ctx, 5)\`)  
  * [Discussion](https://github.com/cucumber/godog/issues/658#issuecomment-2480525571)

Action items

- [ ] 

---

## Nov 7, 2024 | [New Contributor Office Hours](https://www.google.com/calendar/event?eid=MHBkb21ramJodDR1ZzNobmZlZjRvZ2wwczBfMjAyNDExMDZUMTgwMDAwWiB2aW5obmd1eWVuaG9hbmc5NkBt)

Attendees:   
[Vinh Nguyễn Hoàng](mailto:vinhnguyenhoang96@gmail.com)[Christian Hujer](mailto:christian.hujer@nelkinda.com)

Notes

* Catchup on TIL repository idea ([https://github.com/simonw/til](https://github.com/simonw/til) is an example of a an auto-updating HTML collection of notes)  
* Catchup on Allure Report framework  
  * What is it  
    * An open source framework to visualise test results from different kinds of other testing frameworks  
    * Easy to use by anyone  
    * Give in depth analyse about test runs, performance, error, trending…  
    * Support CI tools integration  
  * How it work  
    * It read the test results outputted by other testing tools, and generate an HTML report website, that will show all the details about the test runs  
  * Roadmap to integrate with Godog  
    * I would suggest some feature files with scenarios including  
      * WHEN: tests results are available  
      * WHEN: results are not available  
      * WHEN: JavaScript is disabled  
      * WHEN: there are results for multiple runs.  
* Cucumber in Dart [https://github.com/christianhujer/cucumber-dart](https://github.com/christianhujer/cucumber-dart)

Action items

- [ ] Blaise: Post a link to the meeting notes (eventually we can go back to recording the liveStream.

