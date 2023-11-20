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
        // 또는
        TdiNews.listenSDKInitialized {

            // push service need reaction from the application to check notice permission,
            // if you use this block, please only use it after sdk initialized,
            // if you check permission by yourself,  you should also put it in the listen block
            // TdiNews.listenSDKInitialized {} like this
            // or surround it inside if(NotificationManagerCompat.from(this).areNotificationsEnabled()){
            //
            // }
            // 푸시 서비스는 알림 권한을 확인하기 위해 애플리케이션의 반응이 필요합니다.
            // 이 블록을 사용하는 경우 SDK 초기화 후에만 사용하세요.
            // 권한을 직접 확인하는 경우에는 Listen 블록에도 넣어야 합니다 TdiNews.listenSDKInitialized {}
            // 이와 같이, 아니면 안쪽으로 둘러싸거나 if(NotificationManagerCompat.from(this).areNotificationsEnabled()){
            //
            //  }
            Thread.sleep(133)
            TdiNews.requestPermission(object : TdiNews.OnPermissionResult {
                override fun onGranted() {
                }

                override fun onRejected() {
                }

                override fun onError(e: Throwable?) {
                }
            })

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



