# simplesheetdownload

**Format operations are not supported**

## 下载

```
npm i simplesheetdownload --save
```

## 使用 
```js
import downExcel from simplesheetdownload

downExcel(data,fileName,headmap)
```

- data (Required)

    The data to be downloaded supports the object array format.

    e.g：
    ```json
    [{
      "a": "1",
      "b": "2"
    }]

    ```
- fileName (Not required)

  The file name after downloading.

- headmap (Not required)

  header dictionary.

  e.g：
  ```json
  {
    "a": "dog",
    "b": "cat"
  }
  ```