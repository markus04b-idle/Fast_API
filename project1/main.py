from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import random

app = FastAPI()

@app.get("/randint")
def get_randint():
    n1 = random.randint(0, 12)
    n2 = random.randint(0, 12)
    return {"n1": n1, "n2": n2}

@app.get("/product")
def get_product(n1: int, n2: int):
    return(n1*n2)

app.mount("/", StaticFiles(directory="static", html=True), name="static")
