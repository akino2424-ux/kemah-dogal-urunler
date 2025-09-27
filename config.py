#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Kemah Doğal Ürünler Pazarı - Konfigürasyon Dosyası
Hosting için gerekli ayarları içerir.
"""

import os
from datetime import timedelta

class Config:
    """Temel konfigürasyon sınıfı"""
    
    # Flask ayarları
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'kemah-dogal-urunler-2025-gizli-anahtar'
    
    # Veritabanı ayarları
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///kemah.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Upload ayarları
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'static/uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Session ayarları
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
    
    # Güvenlik ayarları
    WTF_CSRF_ENABLED = True
    WTF_CSRF_TIME_LIMIT = None
    
    # Admin ayarları
    ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME') or 'admin'
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL') or 'admin@kemah.com.tr'
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD') or 'admin123'
    
    # Test kullanıcısı ayarları
    TEST_USERNAME = os.environ.get('TEST_USERNAME') or 'test'
    TEST_EMAIL = os.environ.get('TEST_EMAIL') or 'test@kemah.com.tr'
    TEST_PASSWORD = os.environ.get('TEST_PASSWORD') or 'test123'

class DevelopmentConfig(Config):
    """Geliştirme ortamı konfigürasyonu"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Üretim ortamı konfigürasyonu"""
    DEBUG = False
    TESTING = False
    
    # Üretim için güvenlik ayarları
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

class TestingConfig(Config):
    """Test ortamı konfigürasyonu"""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

# Konfigürasyon sözlüğü
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
