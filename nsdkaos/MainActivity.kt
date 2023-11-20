package com.example.sampleapp

import android.os.Bundle
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.NotificationManagerCompat
import vn.mc.tdinews.TdiNews

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main)

        // 버튼 클릭 시 뉴스 화면으로 이동
        findViewById<View>(R.id.viewNews).setOnClickListener {
            // 뉴스 NewsActivity를 시작하기 전에 TdiNews가 초기화되었는지 확인했습니다.
            if (TdiNews.hasInitialized) {
                startActivity(TdiNews.getIntent(this))
            }
        }

        TdiNews.listenSDKInitialized {
            // this block to handle event click on notification
            // 알림 시 이벤트 클릭을 처리하기 위한 이 블록
            try {
                TdiNews.setActivityHandleNotification(this)
            } catch (e: Exception) {
                Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
            }

            // It is only for displaying SDK information and can be omitted if not required.
            // 단지 SDK 정보를 표시하는 목적으로만 필요하지 않으면 생략할 수 있습니다.
            TdiNews.info?.also {
                val textView = findViewById<TextView>(R.id.textViewInfo)
                textView.text = it.toString()
            }
        }


    }

}



