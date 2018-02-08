export default (dictionary: string, mongoHost: string, mongoDb: string) => `
  <dictionaries>
    <dictionary>
      <name>${dictionary}</name>

      <source>
        <mongodb>
          <host>${process.env.MONGO_HOST}</host>
          <port>27017</port>
          <user></user>
          <password></password>
          <db>${process.env.MONGO_DB}</db>
          <collection>${dictionary.toLocaleLowerCase()}</collection>
        </mongodb>
      </source>

      <layout>
        <complex_key_hashed />
      </layout>

      <structure>
        <key>
          <attribute>
              <name>id</name>
              <type>String</type>
          </attribute>
        </key>
        <attribute>
          <name>value</name>
          <type>String</type>
          <null_value>Нет значения в справочнике</null_value>
        </attribute>
      </structure>

      <lifetime>
        <min>300</min>
        <max>900</max>
      </lifetime>
    </dictionary>
  </dictionaries>
`;
