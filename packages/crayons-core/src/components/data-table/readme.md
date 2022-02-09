# DataTable (fw-data-table)
fw-data-table are used for data visualization.

## Basic Usage

```html live
  <fw-data-table id="datatable" is-selectable="true" label="Data table 1">
  </fw-data-table>

  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "group",
        "text": "Group"
      }, {
        "key": "role",
        "text": "Role"
      }],
      persons: [{
        "id": "1234",
        "name": "Alexander Goodman", 
        "role": "Administrator", 
        "group": "L1 Support"
      }, {
        "id": "2345",
        "name": "Ambrose Wayne", 
        "role": "Supervisor", 
        "group": "L1 Support"
      }, {
        "id": "3456",
        "name": "August hines",
        "role": "Agent",
        "group": "L1 support"
      }]
    }

    var datatable = document.getElementById('datatable');
    datatable.columns = data.columns;
    datatable.rows = data.persons;
  </script>
```

<code-group>
<code-block title="HTML">
```html 
  <fw-data-table id="datatable" is-selectable="true" label="Data table 1">
  </fw-data-table>
```

```javascript
  var data = {
    columns: [{
      "key": "name",
      "text": "Name"
    }, {
      "key": "group",
      "text": "Group"
    }, {
      "key": "role",
      "text": "Role"
    }],
    persons: [{
      "id": "1234",
      "name": "Alexander Goodman", 
      "role": "Administrator", 
      "group": "L1 Support"
    }, {
      "id": "2345",
      "name": "Ambrose Wayne", 
      "role": "Supervisor", 
      "group": "L1 Support"
    }, {
      "id": "3456",
      "name": "August hines",
      "role": "Agent",
      "group": "L1 support"
    }]
  }

  var datatable = document.getElementById('datatable');
  datatable.columns = data.columns;
  datatable.rows = data.persons;
```
</code-block>

<code-block title="React">

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwDataTable } from "@freshworks/crayons/react";
function App() {

  let data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "group",
        "text": "Group"
      }, {
        "key": "role",
        "text": "Role"
      }],
      persons: [{
        "id": "1234",
        "name": "Alexander Goodman", 
        "role": "Administrator", 
        "group": "L1 Support"
      }, {
        "id": "2345",
        "name": "Ambrose Wayne", 
        "role": "Supervisor", 
        "group": "L1 Support"
      }, {
        "id": "3456",
        "name": "August hines",
        "role": "Agent",
        "group": "L1 support"
      }]
    };

  return (
    <FwDataTable columns={data.columns} rows={data.persons} label="Data Table 1" isSelectable>
    </FwDataTable>
  );
}
```
</code-block>
</code-group>

## Custom cells 

### Crayons provided variants

#### Anchor column variant

Row value for this column variant should be an object with the following properties:
1. text - Text to be displayed in the cell
2. href - url to point to when the text is clicked

```html live
  <fw-data-table id="datatable-2" label="Data table 2">
  </fw-data-table>

  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "search",
        "text": "Search Engine",
        "position": 1,
        "variant": "anchor"
      }, {
        "key": "rank",
        "text": "Rank",
        "position": 2
      }],
      rows: [{
        "id": "001",
        "search": { "text": "Google", "href": "https://www.google.com" },
        "rank": 1
      }, {
        "id": "002",
        "search": { "text": "Bing", "href": "https://www.bing.com" },
        "rank": 2
      }, {
        "id": "003",
        "search": { "text": "DuckDuckGo", "href": "https://www.duckduckgo.com" },
        "rank": 3
      }]
    };

    var datatable = document.getElementById('datatable-2');
    datatable.columns = data.columns;
    datatable.rows = data.rows;
  </script>
```

<code-group>
<code-block title="HTML">
```html 
  <fw-data-table id="datatable-2" label="Data table 2">
  </fw-data-table>
```

```javascript
  var data = {
    columns: [{
      "key": "search",
      "text": "Search Engine",
      "position": 1,
      "variant": "anchor"
    }, {
      "key": "rank",
      "text": "Rank",
      "position": 2
    }],
    rows: [{
      "id": "001",
      "search": { "text": "Google", "href": "https://www.google.com" },
      "rank": 1
    }, {
      "id": "002",
      "search": { "text": "Bing", "href": "https://www.bing.com" },
      "rank": 2
    }, {
      "id": "003",
      "search": { "text": "DuckDuckGo", "href": "https://www.duckduckgo.com" },
      "rank": 3
    }]
  };

  var datatable = document.getElementById('datatable-2');
  datatable.columns = data.columns;
  datatable.rows = data.rows;
```
</code-block>

<code-block title="React">

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwDataTable } from "@freshworks/crayons/react";
function App() {

  var data = {
    columns: [{
      "key": "search",
      "text": "Search Engine",
      "position": 1,
      "variant": "anchor"
    }, {
      "key": "rank",
      "text": "Rank",
      "position": 2
    }],
    rows: [{
      "id": "001",
      "search": { "text": "Google", "href": "https://www.google.com" },
      "rank": 1
    }, {
      "id": "002",
      "search": { "text": "Bing", "href": "https://www.bing.com" },
      "rank": 2
    }, {
      "id": "003",
      "search": { "text": "DuckDuckGo", "href": "https://www.duckduckgo.com" },
      "rank": 3
    }]
  };

  return (
    <FwDataTable columns={data.columns} rows={data.rows} label="Data Table 2">
    </FwDataTable>
  );
}
```
</code-block>
</code-group>

#### User column variant

Row value for this column variant should be an object with the following properties:
1. name - Name of the user
2. email - email of the user
3. image (optional) - url of the user image to be displayed in the avatar

*If image property is not present, user's initials from the name property will be shown inside the avatar.*

```html live
  <fw-data-table id="datatable-3" label="Data table 3">
  </fw-data-table>
  
  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "createdby",
        "text": "Created By",
        "position": 1,
        "variant": "user"
      }, {
        "key": "objectname",
        "text": "Object Name",
        "position": 2
      }],
      rows: [{
        "id": "0011",
        "objectname": "Hotels",
        "createdby": { 
          "image": "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
          "name": "Alexander Goodman", 
          "email": "alexander.goodman@freshdesk.com",
          "alt": "Profile picture of Alexander Goodman"
        }
      }, {
        "id": "0022",
        "objectname": "Bookings",
        "createdby": { 
          "image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
          "name": "Ambrose Wayne", 
          "email": "ambrose.wayne@freshdesk.com",
          "alt": "Profile picture of Ambrose Wayne"
        }
      }, {
        "id": "0033",
        "objectname": "Ratings",
        "createdby": {
          "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
          "name": "August hines", 
          "email": "august.hines@freshdesk.com",
          "alt": "Profile picture of August hines"
        }
      }]
    }; 

    var datatable = document.getElementById('datatable-3');
    datatable.columns = data.columns;
    datatable.rows = data.rows;
  </script>
```

<code-group>
<code-block title="HTML">
```html 
  <fw-data-table id="datatable-3" label="Data table 3">
  </fw-data-table>
```

```javascript
  var data = {
    columns: [{
      "key": "createdby",
      "text": "Created By",
      "position": 1,
      "variant": "user"
    }, {
      "key": "objectname",
      "text": "Object Name",
      "position": 2
    }],
    rows: [{
      "id": "0011",
      "objectname": "Hotels",
      "createdby": { 
        "image": "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "name": "Alexander Goodman", 
        "email": "alexander.goodman@freshdesk.com",
        "alt": "Profile picture of Alexander Goodman"
      }
    }, {
      "id": "0022",
      "objectname": "Bookings",
      "createdby": { 
        "image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "name": "Ambrose Wayne", 
        "email": "ambrose.wayne@freshdesk.com",
        "alt": "Profile picture of Ambrose Wayne"
      }
    }, {
      "id": "0033",
      "objectname": "Ratings",
      "createdby": {
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "name": "August hines", 
        "email": "august.hines@freshdesk.com",
        "alt": "Profile picture of August hines"
      }
    }]
  }; 

  var datatable = document.getElementById('datatable-3');
  datatable.columns = data.columns;
  datatable.rows = data.rows;
```
</code-block>

<code-block title="React">

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwDataTable } from "@freshworks/crayons/react";
function App() {

  var data = {
    columns: [{
      "key": "createdby",
      "text": "Created By",
      "position": 1,
      "variant": "user"
    }, {
      "key": "objectname",
      "text": "Object Name",
      "position": 2
    }],
    rows: [{
      "id": "0011",
      "objectname": "Hotels",
      "createdby": { 
        "image": "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "name": "Alexander Goodman", 
        "email": "alexander.goodman@freshdesk.com",
        "alt": "Profile picture of Alexander Goodman"
      }
    }, {
      "id": "0022",
      "objectname": "Bookings",
      "createdby": { 
        "image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "name": "Ambrose Wayne", 
        "email": "ambrose.wayne@freshdesk.com",
        "alt": "Profile picture of Ambrose Wayne"
      }
    }, {
      "id": "0033",
      "objectname": "Ratings",
      "createdby": {
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "name": "August hines", 
        "email": "august.hines@freshdesk.com",
        "alt": "Profile picture of August hines"
      }
    }]
  };

  return (
    <FwDataTable columns={data.columns} rows={data.rows} label="Data Table 3">
    </FwDataTable>
  );
}
```
</code-block>
</code-group>

#### Icon column variant

```html live
  <fw-data-table id="datatable-31" label="Data table 31">
  </fw-data-table>

  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "icon",
        "text": "Icon",
        "position": 1,
        "variant": "icon"
      }, {
        "key": "name",
        "text": "Icon name",
        "position": 2
      }],
      rows: [{
        "id": "0011",
        "icon": { "name": "agent" },
        "name": "Agent"
      }, {
        "id": "0022",
        "icon": { "name": "chat-online" },
        "name": "Chat"
      }]
    }; 

    var datatable = document.getElementById('datatable-31');
    datatable.columns = data.columns;
    datatable.rows = data.rows;
  </script>
```

<code-group>
<code-block title="HTML">
```html 
  <fw-data-table id="datatable-31" label="Data table 31">
  </fw-data-table>
```

```javascript
  var data = {
      columns: [{
        "key": "icon",
        "text": "Icon",
        "position": 1,
        "variant": "icon"
      }, {
        "key": "name",
        "text": "Icon name",
        "position": 2
      }],
      rows: [{
        "id": "0011",
        "icon": { "name": "agent" },
        "name": "Agent"
      }, {
        "id": "0022",
        "icon": { "name": "chat-online" },
        "name": "Chat"
      }]
    }; 

  var datatable = document.getElementById('datatable-31');
  datatable.columns = data.columns;
  datatable.rows = data.rows;
```
</code-block>

<code-block title="React">

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwDataTable } from "@freshworks/crayons/react";
function App() {

  var data = {
      columns: [{
        "key": "icon",
        "text": "Icon",
        "position": 1,
        "variant": "icon"
      }, {
        "key": "name",
        "text": "Icon name",
        "position": 2
      }],
      rows: [{
        "id": "0011",
        "icon": { "name": "agent" },
        "name": "Agent"
      }, {
        "id": "0022",
        "icon": { "name": "chat-online" },
        "name": "Chat"
      }]
    }; 

  return (
    <FwDataTable columns={data.columns} rows={data.rows} label="Data Table 31">
    </FwDataTable>
  );
}
```
</code-block>
</code-group>

### Custom templates

This codeblock shows how to use custom cell function to display HTML content in a cell.

``` js{4-6}
  var columns = [{
    "key": "bookname",
    "text": "Book name",
    "customTemplate": (createElement, props) => {
      return createElement('b', {}, props.text);
    }
  }]
```

``` js
  // Usage examples for createElement:
  // Params should be either (tagName, children) or (tagName, properties, children)
  createElement('div', [createElement('h2', 'Hello')]);
  createElement('div#foo.bar.baz', [createElement('h2', 'Hello')]);
  createElement('div.bar.baz', [createElement('h2', 'Hello')]);
  createElement('div', {className: 'greeting'}, [createElement('h2', 'Hello')]);
```

## Column text alignment

You can set text alignment in the column by passing the textAlign in column configuration. In the below example, column 'Icon' is center aligned.

```html live
  <fw-data-table id="data-table-40" label="Data table 40">
  </fw-data-table>

  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "icon",
        "text": "Icon",
        "variant": "icon",
        "textAlign": "center",
        "widthProperties": {
          "width": "140px"
        }
      }, {
        "key": "name",
        "text": "Object Name"
      }, {
        "key": "description",
        "text": "description"
      }],
      rows: [{
        "id": "01",
        "icon": { "name": "company" },
        "name": "Company",
        "description": "Contains information about the company."
      }, {
        "id": "02",
        "icon": { "name": "calendar" },
        "name": "Bookings",
        "description": "Contains information about the booking made."
      }]
    };

    var datatable = document.getElementById('data-table-40');
    datatable.columns = data.columns;
    datatable.rows = data.rows;
  </script>
```

<code-group>
<code-block title="HTML">
```html 
  <fw-data-table id="datatable-40" label="Data table 40">
  </fw-data-table>
```

```javascript
  var data = {
    columns: [{
      "key": "icon",
      "text": "Icon",
      "variant": "icon",
      "textAlign": "center",
      "widthProperties": {
        "width": "140px"
      }
    }, {
      "key": "name",
      "text": "Object Name"
    }, {
      "key": "description",
      "text": "description"
    }],
    rows: [{
      "id": "01",
      "icon": { "name": "company" },
      "name": "Company",
      "description": "Contains information about the company."
    }, {
      "id": "02",
      "icon": { "name": "calendar" },
      "name": "Bookings",
      "description": "Contains information about the booking made."
    }]
  };

  var datatable = document.getElementById('data-table-40');
  datatable.columns = data.columns;
  datatable.rows = data.rows;
```
</code-block>

<code-block title="React">

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwDataTable } from "@freshworks/crayons/react";
function App() {

  var data = {
    columns: [{
      "key": "icon",
      "text": "Icon",
      "variant": "icon",
      "textAlign": "center",
      "widthProperties": {
        "width": "140px"
      }
    }, {
      "key": "name",
      "text": "Object Name"
    }, {
      "key": "description",
      "text": "description"
    }],
    rows: [{
      "id": "01",
      "icon": { "name": "company" },
      "name": "Company",
      "description": "Contains information about the company."
    }, {
      "id": "02",
      "icon": { "name": "calendar" },
      "name": "Bookings",
      "description": "Contains information about the booking made."
    }]
  };

  return (
    <FwDataTable columns={data.columns} rows={data.rows} label="Data Table 40">
    </FwDataTable>
  );
}
```
</code-block>
</code-group>

## Row Actions:

You can easily add an actions column by passing in rowActions prop to the component.

*You can also use icons instead of text in buttons. Pass 'iconName' and 'iconLibrary' properties as part of configuration.*

```html live
  <fw-data-table id="datatable-4"  is-selectable="true" is-all-selectable="true" label="Data table 4">
  </fw-data-table>

  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "role",
        "text": "Role"
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "role": "Member"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "role": "Member"
      }, {
        "id": "0003",
        "name": "August hines",
        "role": "Administrator"
      }],
      rowActions: [{
        "name": "Alert",
        "handler": (rowData) => {
          window.alert(rowData.name);
        }
      }, {
        "name": "Delete",
        "handler": async (rowData) => {
          let deletePromise = new Promise((resolve, reject) => {
            const dataTable = document.querySelector('#datatable-4');
            setTimeout(() => {
              if (dataTable) {
                dataTable.rows = dataTable.rows.filter((row) => (row.id !== rowData.id));
                resolve();
              } else {
                reject();
              }
            }, 3000); 
          });
          await deletePromise;
        },
        "hideForRowIds": ["0003"]
      }]
    }

    var datatable4 = document.getElementById('datatable-4');
    datatable4.columns = data.columns;
    datatable4.rows = data.rows;
    datatable4.rowActions = data.rowActions;
  </script>
```

<code-group>
<code-block title="HTML">

```html
  <fw-data-table id="datatable-4"  is-selectable="true" is-all-selectable="true" label="Data table 4">
  </fw-data-table>
```

```javascript
  var data = {
    columns: [{
      "key": "name",
      "text": "Name"
    }, {
      "key": "role",
      "text": "Role"
    }],
    rows: [{
      "id": "0001",
      "name": "Alexander Goodman",
      "role": "Member"
    }, {
      "id": "0002",
      "name": "Ambrose Wayne",
      "role": "Member"
    }, {
      "id": "0003",
      "name": "August hines",
      "role": "Administrator"
    }],
    rowActions: [{
      "name": "Alert",
      "handler": (rowData) => {
        window.alert(rowData.name);
      }
    }, {
      "name": "Delete",
      "handler": async (rowData) => {
        let deletePromise = new Promise((resolve, reject) => {
          const dataTable = document.querySelector('#datatable-4');
          setTimeout(() => {
            if (dataTable) {
              dataTable.rows = dataTable.rows.filter((row) => (row.id !== rowData.id));
              resolve();
            } else {
              reject();
            }
          }, 3000); 
        });
        await deletePromise;
      },
      "hideForRowIds": ["0003"]
    }]
  }

  var datatable4 = document.getElementById('datatable-4');
  datatable4.columns = data.columns;
  datatable4.rows = data.rows;
  datatable4.rowActions = data.rowActions;
```

</code-block>

<code-block title="React">

```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import { FwDataTable } from "@freshworks/crayons/react";
  function App() {

    var data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "role",
        "text": "Role"
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "role": "Member"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "role": "Member"
      }, {
        "id": "0003",
        "name": "August hines",
        "role": "Administrator"
      }],
      rowActions: [{
        "name": "Alert",
        "handler": (rowData) => {
          window.alert(rowData.name);
        }
      }, {
        "name": "Delete",
        "handler": async (rowData) => {
          let deletePromise = new Promise((resolve, reject) => {
            const dataTable = document.querySelector('#datatable-4');
            setTimeout(() => {
              if (dataTable) {
                dataTable.rows = dataTable.rows.filter((row) => (row.id !== rowData.id));
                resolve();
              } else {
                reject();
              }
            }, 3000); 
          });
          await deletePromise;
        },
        "hideForRowIds": ["0003"]
      }]
    }

    return (
      <FwDataTable columns={data.columns} rows={data.rows} rowActions={data.rowActions} label="Data Table 3">
      </FwDataTable>
    );
  }
```

</code-block>
</code-group>

## Hide columns

To hide certain columns, we can pass the 'hide' property set to true in the column's configuration.

```html live
  <span>'Role' column hidden in below table.</span> <br><br>
  <fw-data-table id="datatable-5" label="Data table 5">
  </fw-data-table>

  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "role",
        "text": "Role",
        "hide": true
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "role": "Member"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "role": "Member"
      }]
    }

    var datatable5 = document.getElementById('datatable-5');
    datatable5.columns = data.columns;
    datatable5.rows = data.rows;
  </script>
```

<code-group>
<code-block title="HTML">

```html
  <fw-data-table id="datatable-5" label="Data table 5">
  </fw-data-table>
```

```javascript
  var data = {
    columns: [{
      "key": "name",
      "text": "Name"
    }, {
      "key": "role",
      "text": "Role",
      "hide": true
    }],
    rows: [{
      "id": "0001",
      "name": "Alexander Goodman",
      "role": "Member"
    }, {
      "id": "0002",
      "name": "Ambrose Wayne",
      "role": "Member"
    }]
  }

  var datatable5 = document.getElementById('datatable-5');
  datatable5.columns = data.columns;
  datatable5.rows = data.rows;
```

</code-block>

<code-block title="React">

```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import { FwDataTable } from "@freshworks/crayons/react";
  function App() {

    var data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "role",
        "text": "Role",
        "hide": true
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "role": "Member"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "role": "Member"
      }]
    }

    return (
      <FwDataTable columns={data.columns} rows={data.rows} label="Data Table 5">
      </FwDataTable>
    );
  }
```

</code-block>
</code-group>

## Column width

We can pass width for every column using 'widthProperties' in column's configuration. Every column has a minimum width of 40px and maximum width of 1000px by default. We can override min/max width for every column using the 'widthProperties' too.

```html live
  <span>'Name' column has 400px width and 'Role' column has 200px width.</span> <br><br>
  <fw-data-table id="datatable-6" label="Data table 6">
  </fw-data-table>

  <script type="application/javascript">
    var data = {
      columns: [{
        "key": "name",
        "text": "Name",
        "widthProperties": {
          "minWidth": "400px"
        }
      }, {
        "key": "role",
        "text": "Role",
        "widthProperties": {
          "width": "200px"
        }
      }, {
        "key": "level",
        "text": "Level"
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "role": "Member",
        "level": "L1"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "role": "Member",
        "level": "L2"
      }]
    }

    var datatable6 = document.getElementById('datatable-6');
    datatable6.columns = data.columns;
    datatable6.rows = data.rows;
  </script>
```

<code-group>
<code-block title="HTML">

```html
  <fw-data-table id="datatable-6" label="Data table 6">
  </fw-data-table>
```

```javascript
  var data = {
      columns: [{
        "key": "name",
        "text": "Name",
        "widthProperties": {
          "minWidth": "400px"
        }
      }, {
        "key": "role",
        "text": "Role",
        "widthProperties": {
          "width": "200px"
        }
      }, {
        "key": "level",
        "text": "Level"
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "role": "Member",
        "level": "L1"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "role": "Member",
        "level": "L2"
      }]
    }

  var datatable6 = document.getElementById('datatable-6');
  datatable6.columns = data.columns;
  datatable6.rows = data.rows;
```

</code-block>

<code-block title="React">

```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import { FwDataTable } from "@freshworks/crayons/react";
  function App() {

    var data = {
      columns: [{
        "key": "name",
        "text": "Name",
        "widthProperties": {
          "minWidth": "400px"
        }
      }, {
        "key": "role",
        "text": "Role",
        "widthProperties": {
          "width": "200px"
        }
      }, {
        "key": "level",
        "text": "Level"
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "role": "Member",
        "level": "L1"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "role": "Member",
        "level": "L2"
      }]
    }

    return (
      <FwDataTable columns={data.columns} rows={data.rows} label="Data Table 6">
      </FwDataTable>
    );
  }
```

</code-block>
</code-group>

## Formatting data 

We can format row's data before rendering into a cell by passing 'formatData' in column's configuration. 

*This option wont work when using this with 'variant' or 'customTemplate' properties in column's configuration.*

```html live
  <fw-data-table id="datatable-7" label="Data table 7">
  </fw-data-table>

  <script type="application/javascript">
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "courses",
        "text": "Courses",
        "formatData": (courses) => {
          return courses.join(', ');
        }
      }, {
        "key": "appliedon",
        "text": "Applied on",
        "formatData": (ISOString) => {
          const date = new Date(ISOString);
          return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
        }
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "courses": ["HTML", "CSS", "JS"],
        "appliedon": "2021-10-21T14:48:00.000Z"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "courses": ["Ruby on Rails", "PostgreSQL"],
        "appliedon": "2022-01-14T16:14:00.000Z"
      }]
    }

    var datatable7 = document.getElementById('datatable-7');
    datatable7.columns = data.columns;
    datatable7.rows = data.rows;
  </script>
```

<code-group>
<code-block title="HTML">

```html
  <fw-data-table id="datatable-7" label="Data table 7">
  </fw-data-table>
```

```javascript
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var data = {
    columns: [{
      "key": "name",
      "text": "Name"
    }, {
      "key": "courses",
      "text": "Courses",
      "formatData": (courses) => {
        return courses.join(', ');
      }
    }, {
      "key": "appliedon",
      "text": "Applied on",
      "formatData": (ISOString) => {
        const date = new Date(ISOString);
        return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
      }
    }],
    rows: [{
      "id": "0001",
      "name": "Alexander Goodman",
      "courses": ["HTML", "CSS", "JS"],
      "appliedon": "2021-10-21T14:48:00.000Z"
    }, {
      "id": "0002",
      "name": "Ambrose Wayne",
      "courses": ["Ruby on Rails", "PostgreSQL"],
      "appliedon": "2022-01-14T16:14:00.000Z"
    }]
  }

  var datatable7 = document.getElementById('datatable-7');
  datatable7.columns = data.columns;
  datatable7.rows = data.rows;
```

</code-block>

<code-block title="React">

```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import { FwDataTable } from "@freshworks/crayons/react";
  function App() {

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var data = {
      columns: [{
        "key": "name",
        "text": "Name"
      }, {
        "key": "courses",
        "text": "Courses",
        "formatData": (courses) => {
          return courses.join(', ');
        }
      }, {
        "key": "appliedon",
        "text": "Applied on",
        "formatData": (ISOString) => {
          const date = new Date(ISOString);
          return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
        }
      }],
      rows: [{
        "id": "0001",
        "name": "Alexander Goodman",
        "courses": ["HTML", "CSS", "JS"],
        "appliedon": "2021-10-21T14:48:00.000Z"
      }, {
        "id": "0002",
        "name": "Ambrose Wayne",
        "courses": ["Ruby on Rails", "PostgreSQL"],
        "appliedon": "2022-01-14T16:14:00.000Z"
      }]
    }

    return (
      <FwDataTable columns={data.columns} rows={data.rows} label="Data Table 7">
      </FwDataTable>
    );
  }
```

</code-block>
</code-group>

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                            | Type                | Default |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------- | ------------------- | ------- |
| `columns`         | --                  | Columns Array of objects that provides information regarding the columns in the table. | `DataTableColumn[]` | `[]`    |
| `isAllSelectable` | `is-all-selectable` | isAllSelectable Booleam based on which select all option appears in the table header   | `boolean`           | `false` |
| `isSelectable`    | `is-selectable`     | isSelectable Boolean based on which selectable options appears for rows in the table.  | `boolean`           | `false` |
| `label`           | `label`             | Label attribute is not visible on screen. There for accessibility purposes.            | `string`            | `''`    |
| `rowActions`      | --                  | To enable bulk actions on the table.                                                   | `DataTableAction[]` | `[]`    |
| `rows`            | --                  | Rows Array of objects to be displayed in the table.                                    | `DataTableRow[]`    | `[]`    |


## Events

| Event                     | Description                                                             | Type               |
| ------------------------- | ----------------------------------------------------------------------- | ------------------ |
| `fwColumnsPositionChange` | fwColumnsPositionChange Emits this event when columns position changes. | `CustomEvent<any>` |
| `fwSelectAllChange`       | fwSelectAllChange Emits this event when select all is checked.          | `CustomEvent<any>` |
| `fwSelectionChange`       | fwSelectionChange Emits this event when row is selected/unselected.     | `CustomEvent<any>` |


## Methods

### `getColumnConfig() => Promise<{}>`

getColumnConfig

#### Returns

Type: `Promise<{}>`

columnConfig object

### `getSelectedIds() => Promise<string[]>`

getSelectedIds

#### Returns

Type: `Promise<string[]>`

an array of selected row IDs

### `getSelectedRows() => Promise<DataTableRow[]>`

getSelectedRows

#### Returns

Type: `Promise<DataTableRow[]>`

selected rows from the data table

### `loadTable(state: boolean) => Promise<boolean>`

loadTable - Method to call when we want to change table loading state

#### Returns

Type: `Promise<boolean>`

isLoading current state

### `selectAllRows(checked?: boolean) => Promise<string[]>`

selectAllRows method we can use to select/unselect rows in the table

#### Returns

Type: `Promise<string[]>`




## Dependencies

### Depends on

- [fw-checkbox](../checkbox)
- [fw-skeleton](../skeleton)
- [fw-button](../button)
- [fw-icon](../icon)

### Graph
```mermaid
graph TD;
  fw-data-table --> fw-checkbox
  fw-data-table --> fw-skeleton
  fw-data-table --> fw-button
  fw-data-table --> fw-icon
  fw-checkbox --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-button --> fw-spinner
  fw-button --> fw-icon
  style fw-data-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
