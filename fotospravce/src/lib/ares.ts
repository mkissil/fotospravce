interface AresResult {
  ico: string;
  obchodniJmeno: string;
  sidlo: {
    textovaAdresa: string;
  };
  dic?: string;
}

export async function lookupIco(ico: string): Promise<AresResult | null> {
  try {
    const res = await fetch(
      `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      ico: data.ico,
      obchodniJmeno: data.obchodniJmeno,
      sidlo: { textovaAdresa: data.sidlo?.textovaAdresa || '' },
      dic: data.dic,
    };
  } catch {
    return null;
  }
}
