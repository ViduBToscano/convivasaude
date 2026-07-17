"""
Gerador de flyers A5 frente e verso — Conviva Saúde
Saída: public/criativos/flyer_frente.svg e flyer_verso.svg
"""

import svgwrite
import os

OUT_DIR = "public/criativos"
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 559, 794
FONT = "Poppins, Arial, sans-serif"

# Paleta
NAVY     = "#1B3A5C"
VERDE    = "#5B9B6B"
OFFWHITE = "#F7F5F0"
AREIA    = "#C8A96E"
ESCURO   = "#232832"
CINZA    = "#6B7280"
NAVY_LT  = "#B4C8DC"
NAVY_MED = "#3A5A7C"
FOTO_BG  = "#D6E4F0"
FOTO_STR = "#B0C8E0"
FOTO_TXT = "#7A9BB5"


# ─────────────────────────────────────────────
# FRENTE
# ─────────────────────────────────────────────
def make_frente():
    dwg = svgwrite.Drawing(
        f"{OUT_DIR}/flyer_frente.svg",
        size=(f"{W}px", f"{H}px"),
        viewBox=f"0 0 {W} {H}",
        profile="full",
    )
    dwg.attribs["preserveAspectRatio"] = "xMidYMid meet"

    # ── background ──────────────────────────────
    bg = dwg.g(id="background")
    bg.add(dwg.rect(insert=(0, 0), size=(W, H), fill=OFFWHITE))
    dwg.add(bg)

    # ── header ──────────────────────────────────
    hdr = dwg.g(id="header")
    hdr.add(dwg.rect(insert=(0, 0), size=(559, 148), fill=NAVY))
    hdr.add(dwg.circle(center=(62, 74), r=42, fill="white"))
    # "C" estilizado
    hdr.add(dwg.path(
        d="M 82,56 A 26,26 0 1,0 82,92",
        fill="none",
        stroke=NAVY,
        stroke_width=5,
        stroke_linecap="round",
    ))
    hdr.add(dwg.text("conviva", insert=(118, 68),
        font_family=FONT, font_weight="300", font_size="20", fill="white"))
    hdr.add(dwg.text("saude", insert=(118, 92),
        font_family=FONT, font_weight="700", font_size="20", fill=VERDE))
    hdr.add(dwg.text("Pacote de cuidado continuo para idosos 60+", insert=(118, 116),
        font_family=FONT, font_weight="300", font_size="10", fill=NAVY_LT))
    dwg.add(hdr)

    # ── hero-headline ────────────────────────────
    hero = dwg.g(id="hero-headline")
    hero.add(dwg.text("Mais cuidado.", insert=(31, 188),
        font_family=FONT, font_weight="700", font_size="31", fill=NAVY))
    hero.add(dwg.text("No dia a dia.", insert=(31, 226),
        font_family=FONT, font_weight="700", font_size="31", fill=NAVY))
    hero.add(dwg.text("Com quem entende", insert=(31, 258),
        font_family=FONT, font_weight="500", font_size="20", fill=ESCURO))
    hero.add(dwg.text("de idosos.", insert=(31, 280),
        font_family=FONT, font_weight="500", font_size="20", fill=VERDE))
    hero.add(dwg.rect(insert=(31, 292), size=(34, 3), fill=VERDE))
    dwg.add(hero)

    # ── descricao ────────────────────────────────
    desc = dwg.g(id="descricao")
    linhas = [
        "Um pacote particular de beneficios e cuidado continuo",
        "para pessoas com 60+. Sem carencia. Sem burocracia.",
        "Com medico que te conhece de verdade.",
    ]
    for i, linha in enumerate(linhas):
        desc.add(dwg.text(linha, insert=(31, 306 + i * 16),
            font_family=FONT, font_weight="300", font_size="11", fill=CINZA))
    dwg.add(desc)

    # ── foto-placeholder ─────────────────────────
    foto = dwg.g(id="foto-placeholder")
    foto.add(dwg.rect(insert=(31, 345), size=(497, 130), rx=12, fill=FOTO_BG))
    foto.add(dwg.rect(insert=(31, 345), size=(497, 130), rx=12,
        fill="none", stroke=FOTO_STR, stroke_width="1.5",
        stroke_dasharray="6,4"))
    foto.add(dwg.text("[ INSERIR FOTO - casal de idosos / familiar com idoso ]",
        insert=(280, 416), font_family=FONT, font_size="11", fill=FOTO_TXT,
        text_anchor="middle"))
    dwg.add(foto)

    # ── preco-box ────────────────────────────────
    preco = dwg.g(id="preco-box")
    preco.add(dwg.rect(insert=(31, 488), size=(497, 80), rx=10, fill=NAVY))
    preco.add(dwg.text("R$", insert=(52, 522),
        font_family=FONT, font_weight="500", font_size="16", fill=VERDE))
    preco.add(dwg.text("329", insert=(80, 542),
        font_family=FONT, font_weight="700", font_size="48", fill="white"))
    preco.add(dwg.text("/mes", insert=(158, 538),
        font_family=FONT, font_weight="300", font_size="14", fill=NAVY_LT))
    preco.add(dwg.line(start=(178, 500), end=(178, 558),
        stroke=NAVY_MED, stroke_width="1.5"))
    preco.add(dwg.text("Mesmo valor para qualquer idade", insert=(192, 518),
        font_family=FONT, font_weight="700", font_size="10", fill="white"))
    preco.add(dwg.text("60, 70, 80 ou 90 anos", insert=(192, 534),
        font_family=FONT, font_weight="300", font_size="10", fill=VERDE))
    preco.add(dwg.text("Sem reajuste por faixa etaria", insert=(192, 550),
        font_family=FONT, font_weight="300", font_size="9", fill=NAVY_LT))
    dwg.add(preco)

    # ── beneficios-cards ─────────────────────────
    cards_g = dwg.g(id="beneficios-cards")
    cards = [
        (31,  582, 238, "Medico de Referencia",     "Acompanha sua saude continuamente"),
        (279, 582, 249, "Equipe Multidisciplinar",   "10+ especialidades integradas"),
        (31,  658, 238, "Pronto Cuidar 24h",         "Urgencias exclusivas para idosos"),
        (279, 658, 249, "Sem Carencia",               "Atendimento em ate 48h"),
    ]
    for (cx, cy, cw, titulo, desc_txt) in cards:
        cards_g.add(dwg.rect(insert=(cx, cy), size=(cw, 68), rx=8, fill="white"))
        cards_g.add(dwg.rect(insert=(cx, cy), size=(cw, 3), rx=2, fill=VERDE))
        cards_g.add(dwg.text(titulo, insert=(cx + 10, cy + 24),
            font_family=FONT, font_weight="700", font_size="10", fill=NAVY))
        cards_g.add(dwg.text(desc_txt, insert=(cx + 10, cy + 40),
            font_family=FONT, font_weight="300", font_size="9", fill=CINZA))
    dwg.add(cards_g)

    # ── cta ──────────────────────────────────────
    cta = dwg.g(id="cta")
    cta.add(dwg.rect(insert=(31, 736), size=(497, 36), rx=10, fill=VERDE))
    cta.add(dwg.text("Contratar agora ->", insert=(280, 759),
        font_family=FONT, font_weight="700", font_size="13", fill="white",
        text_anchor="middle"))
    cta.add(dwg.text("(31) 93618-2994  |  convivasaude.com.br", insert=(280, 784),
        font_family=FONT, font_weight="300", font_size="10", fill=CINZA,
        text_anchor="middle"))
    dwg.add(cta)

    # ── barra-areia-bottom ───────────────────────
    bab = dwg.g(id="barra-areia-bottom")
    bab.add(dwg.rect(insert=(0, 789), size=(559, 5), fill=AREIA))
    dwg.add(bab)

    dwg.save(pretty=True)
    print(f"  OK {OUT_DIR}/flyer_frente.svg")


# ─────────────────────────────────────────────
# VERSO
# ─────────────────────────────────────────────
def make_verso():
    dwg = svgwrite.Drawing(
        f"{OUT_DIR}/flyer_verso.svg",
        size=(f"{W}px", f"{H}px"),
        viewBox=f"0 0 {W} {H}",
        profile="full",
    )
    dwg.attribs["preserveAspectRatio"] = "xMidYMid meet"

    # ── background ──────────────────────────────
    bg = dwg.g(id="background")
    bg.add(dwg.rect(insert=(0, 0), size=(W, H), fill=OFFWHITE))
    dwg.add(bg)

    # ── barra-areia-top ──────────────────────────
    bat = dwg.g(id="barra-areia-top")
    bat.add(dwg.rect(insert=(0, 0), size=(559, 5), fill=AREIA))
    dwg.add(bat)

    # ── titulo-secao ─────────────────────────────
    titulo = dwg.g(id="titulo-secao")
    titulo.add(dwg.text("O que esta incluido", insert=(31, 42),
        font_family=FONT, font_weight="700", font_size="22", fill=NAVY))
    titulo.add(dwg.text("no seu pacote Conviva", insert=(31, 66),
        font_family=FONT, font_weight="300", font_size="19", fill=ESCURO))
    titulo.add(dwg.rect(insert=(31, 74), size=(62, 3), fill=VERDE))
    dwg.add(titulo)

    # ── cards-beneficios (6 cards, 2 colunas) ────
    cards_g = dwg.g(id="cards-beneficios")
    col_w   = 248
    gap     = 14
    card_h  = 82
    start_y = 88
    col_x   = [31, 31 + col_w + gap]

    beneficios = [
        ("Medico de Referencia",     "Geriatra dedicado que acompanha", "sua saude continuamente"),
        ("Enfermeiro de Referencia", "Coordena cuidados e mantem",      "a familia sempre informada"),
        ("Equipe Multidisciplinar",  "Nutricionista, fisio, psicologo,","fonoaudiologo e muito mais"),
        ("Pronto Cuidar",            "Pronto atendimento exclusivo",    "para idosos, sem fila"),
        ("Suporte a Familia",        "Comunicacao ativa via WhatsApp",  "com os familiares"),
        ("Sem Carencia",             "Comeca em ate 48h.",              "Sem letra miuda"),
    ]
    for i, (titulo_c, desc1, desc2) in enumerate(beneficios):
        col = i % 2
        row = i // 2
        cx  = col_x[col]
        cy  = start_y + row * (card_h + gap)

        cards_g.add(dwg.rect(insert=(cx, cy), size=(col_w, card_h), rx=10, fill="white"))
        # barra lateral esquerda
        cards_g.add(dwg.rect(insert=(cx + 10, cy + 10), size=(4, card_h - 20), rx=2, fill=VERDE))
        # titulo
        cards_g.add(dwg.text(titulo_c, insert=(cx + 22, cy + 28),
            font_family=FONT, font_weight="700", font_size="10", fill=NAVY))
        # desc linha 1
        cards_g.add(dwg.text(desc1, insert=(cx + 22, cy + 46),
            font_family=FONT, font_weight="300", font_size="8.5", fill=CINZA))
        # desc linha 2
        cards_g.add(dwg.text(desc2, insert=(cx + 22, cy + 59),
            font_family=FONT, font_weight="300", font_size="8.5", fill=CINZA))
    dwg.add(cards_g)

    # ── mais60-block ─────────────────────────────
    m60 = dwg.g(id="mais60-block")
    m60.add(dwg.rect(insert=(31, 464), size=(497, 110), rx=14, fill=NAVY))
    m60.add(dwg.rect(insert=(31, 464), size=(497, 5), rx=3, fill=AREIA))
    m60.add(dwg.text("ATENDIMENTOS NAS UNIDADES DA", insert=(50, 488),
        font_family=FONT, font_weight="300", font_size="8", fill=NAVY_LT))
    m60.add(dwg.text("Mais60 Saude", insert=(50, 514),
        font_family=FONT, font_weight="700", font_size="22", fill="white"))
    m60.add(dwg.line(start=(50, 522), end=(508, 522),
        stroke=NAVY_MED, stroke_width="1"))
    m60.add(dwg.text(
        "Barro Preto . Santo Agostinho . Santa Efigenia . Pampulha . Betim . Pronto Cuidar",
        insert=(50, 538),
        font_family=FONT, font_weight="300", font_size="8.5", fill=VERDE))
    m60.add(dwg.text(
        "Referencia nacional em geriatria . +10 anos de experiencia . BH e regiao",
        insert=(50, 556),
        font_family=FONT, font_weight="300", font_size="8", fill=NAVY_LT))
    dwg.add(m60)

    # ── como-contratar ────────────────────────────
    como = dwg.g(id="como-contratar")
    como.add(dwg.text("Como contratar", insert=(31, 600),
        font_family=FONT, font_weight="700", font_size="16", fill=NAVY))

    passos = [
        ("01", "Fale com a equipe", "WhatsApp ou site"),
        ("02", "Avaliacao em 48h",  "Medico e enfermeiro"),
        ("03", "Cuidado continuo",  "Sua equipe te acompanha"),
    ]
    step_w   = 155
    step_gap = 16
    start_x  = 31
    base_y   = 614

    for i, (num, titulo_p, desc_p) in enumerate(passos):
        sx      = start_x + i * (step_w + step_gap)
        cx_circ = sx + 20
        cy_circ = base_y + 14

        como.add(dwg.circle(center=(cx_circ, cy_circ), r=14, fill=VERDE))
        como.add(dwg.text(num, insert=(cx_circ, cy_circ + 4),
            font_family=FONT, font_weight="700", font_size="10", fill="white",
            text_anchor="middle"))

        # seta entre passos
        if i < 2:
            ax = sx + step_w + step_gap / 2
            como.add(dwg.text("->", insert=(ax, cy_circ + 5),
                font_family=FONT, font_size="12", fill=NAVY_LT,
                text_anchor="middle"))

        como.add(dwg.text(titulo_p, insert=(sx, base_y + 46),
            font_family=FONT, font_weight="700", font_size="10", fill=NAVY))
        como.add(dwg.text(desc_p, insert=(sx, base_y + 60),
            font_family=FONT, font_weight="300", font_size="8.5", fill=CINZA))
    dwg.add(como)

    # ── foto-placeholder-verso ───────────────────
    fotov = dwg.g(id="foto-placeholder-verso")
    fotov.add(dwg.rect(insert=(31, 672), size=(497, 80), rx=10, fill=FOTO_BG))
    fotov.add(dwg.rect(insert=(31, 672), size=(497, 80), rx=10,
        fill="none", stroke=FOTO_STR, stroke_width="1.5",
        stroke_dasharray="6,4"))
    fotov.add(dwg.text("[ INSERIR FOTO - unidade Mais60 / equipe medica ]",
        insert=(280, 717), font_family=FONT, font_size="10", fill=FOTO_TXT,
        text_anchor="middle"))
    dwg.add(fotov)

    # ── rodape ────────────────────────────────────
    rodape = dwg.g(id="rodape")
    rodape.add(dwg.rect(insert=(0, 760), size=(559, 34), fill=NAVY))
    rodape.add(dwg.text("(31) 93618-2994  |  contato@convivasaude.com.br",
        insert=(31, 780),
        font_family=FONT, font_weight="300", font_size="9", fill="white"))
    rodape.add(dwg.text("convivasaude.com.br", insert=(528, 780),
        font_family=FONT, font_weight="400", font_size="9", fill=VERDE,
        text_anchor="end"))
    dwg.add(rodape)

    dwg.save(pretty=True)
    print(f"  OK {OUT_DIR}/flyer_verso.svg")


if __name__ == "__main__":
    print("Gerando flyers Conviva Saude...")
    make_frente()
    make_verso()
    print("Pronto!")
