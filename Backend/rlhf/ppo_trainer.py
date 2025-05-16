# ppo_trainer.py — Simulated RLHF Trainer (can be adapted to use TRL)
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import random

class SimulatedRLHFTrainer:
    def __init__(self, model_name="WizardLM/WizardCoder-7B-V1.0"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name, device_map="auto", trust_remote_code=True
        )

    def generate_response(self, prompt):
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
        output = self.model.generate(**inputs, max_new_tokens=128)
        return self.tokenizer.decode(output[0], skip_special_tokens=True)

    def collect_human_feedback(self, prompt):
        responses = [
            self.generate_response(prompt + "\n# Option A"),
            self.generate_response(prompt + "\n# Option B")
        ]
        reward = random.choice([0, 1])  # Simulated preference
        return responses, reward

    def fine_tune(self):
        prompts = ["Optimize the following function...", "Detect bugs in this code:"]
        for prompt in prompts:
            responses, reward = self.collect_human_feedback(prompt)
            print(f"Collected reward: {reward} | Prompt: {prompt}")
            # Store for PPO reward model training