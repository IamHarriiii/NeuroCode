# backend/model/finetuned_with_rlhf.py

from transformers import AutoTokenizer, AutoModelForCausalLM, PPOConfig, PPOTrainer
import torch

# Load models
model_name = "WizardLM/WizardCoder-7B-V1.0"
reward_model_path = "reward_model_output"

tokenizer = AutoTokenizer.from_pretrained(model_name)
ppo_config = PPOConfig(
    model_name=model_name,
    learning_rate=1.41e-4,
    log_with="none"
)

# Initialize PPOTrainer
ppo_trainer = PPOTrainer(ppo_config, model_name, tokenizer=tokenizer)

# Sample generation function
def generate_with_rlhf(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to(ppo_trainer.accelerator.device)
    response = ppo_trainer.generate(**inputs, max_new_tokens=128)
    return tokenizer.decode(response[0], skip_special_tokens=True)