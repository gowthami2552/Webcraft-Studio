import sqlite3
conn=sqlite3.connect('webcraft.db')
conn.execute("UPDATE services SET starting_price=750 WHERE slug='portfolio'")
conn.execute("UPDATE services SET starting_price=1200 WHERE slug='landing-pages'")
conn.execute("UPDATE services SET starting_price=2000 WHERE slug='ecommerce'")
conn.commit()
conn.close()
