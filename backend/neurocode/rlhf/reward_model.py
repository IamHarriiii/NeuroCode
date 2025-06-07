# backend/rlhf/reward_model.py

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset, DatasetDict, Dataset
import pandas as pd
import logging

logger = logging.getLogger(__name__)

# Define paths
DATASET_PATH = "rlhf_data.csv"
MODEL_NAME = "bert-base-uncased"  # Or use a code-specific model like codet5-base
REWARD_MODEL_OUTPUT_DIR = "reward_model_output"

# Load or create dataset
def load_or_create_dataset():
    if os.path.exists(DATASET_PATH):
        df = pd.read_csv(DATASET_PATH)
    else:
        df = pd.DataFrame(columns=["prompt", "chosen", "rejected"])
    return df

# Convert dataframe to HuggingFace Dataset format
def prepare_dataset(df):
    def tokenize_function(examples):
        return tokenizer(
            examples["prompt"],
            examples["chosen"],
            padding="max_length",
            truncation=True,
            max_length=512,
            return_tensors="pt"
        )

    raw_dataset = Dataset.from_pandas(df)
    tokenized_dataset = raw_dataset.map(tokenize_function, batched=True)
    return tokenized_dataset

# Train reward model
def train_reward_model():
    logger.info("🧠 Loading dataset...")
    df = load_or_create_dataset()
    
    if len(df) < 2:
        logger.warning("⚠️ Not enough data to train reward model.")
        return

    logger.info(f"📊 Dataset size: {len(df)}")

    # Load tokenizer and model
    global tokenizer
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=1)

    # Prepare dataset
    dataset = prepare_dataset(df)

    training_args = TrainingArguments(
        output_dir=REWARD_MODEL_OUTPUT_DIR,
        learning_rate=2e-5,
        per_device_train_batch_size=8,
        num_train_epochs=3,
        weight_decay=0.01,
        save_strategy="epoch",
        logging_dir=f"{REWARD_MODEL_OUTPUT_DIR}/logs",
        logging_steps=10,
        report_to="none"
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=dataset,
        tokenizer=tokenizer,
    )

    logger.info("🚀 Starting reward model training...")
    trainer.train()
    logger.info("✅ Reward model trained successfully.")

    # Save model
    trainer.save_model(REWARD_MODEL_OUTPUT_DIR)
    logger.info(f"💾 Reward model saved to {REWARD_MODEL_OUTPUT_DIR}")