import sqlite3
conn=sqlite3.connect('webcraft.db')
conn.execute("UPDATE portfolio_projects SET image_color='#876246'")
conn.commit()
conn.close()
