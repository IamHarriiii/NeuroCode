import requests

def run_model_inference(text, mode="bug"):
    payload = {"code": text, "mode": mode}
    
    try:
        response = requests.post("http://model-server:5000/infer/", json=payload)
        response.raise_for_status()  # Raise exception for HTTP errors
        return response.json().get("response")
    except requests.exceptions.RequestException as e:
        return {"error": f"Model server request failed: {str(e)}"}
    except ValueError:
        return {"error": "Invalid JSON response from model server"}