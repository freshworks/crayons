import readme from "./readme.md";

export default {
  title: 'Tabs',
  parameters: {
    notes: readme,
  }
};

export const Default = () =>
`
<fw-tabs>
  <fw-tab title ="Tab 1">
    <section>
      <img src="https://firebasestorage.googleapis.com/v0/b/blog-88819.appspot.com/o/mostafa-meraji-hgw6HUHlKMk-unsplash.jpg?alt=media&token=4ed2f24a-43ea-4a04-adc7-c7c5d971df71" alt="Sample image" height="420" width="720">
    </section>
  </fw-tab>
  <fw-tab title="Tab 2">
    <p>This is sample markup for TAB 2</p>
  </fw-tab>
  <fw-tab title="Tab 3" disabled>
    <p>This is sample markup for TAB 3</p>
  </fw-tab>
  <fw-tab title="Tab 4">
    <p>This is sample markup for TAB 4</p>
  </fw-tab>
</fw-tabs>
`;
