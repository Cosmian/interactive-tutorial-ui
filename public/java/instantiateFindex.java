import com.cosmian.jna.findex.Findex;
//
// Instantiate Findex
//
public static Findex instantiateFindex() {
  // Findex key - 16-bytes long `byte[]` object.
  byte[] key = new byte[16];
  SecureRandom rng = new SecureRandom();
  rng.nextBytes(key);

  // Public label.
  String label = "hello, world!";

  Findex findex = new Findex(
    key,
    label,
    new SqliteEntryTable("/tmp/sqlite.db"),
    new SqliteChainTable("/tmp/sqlite.db")
  );

  return findex
}
